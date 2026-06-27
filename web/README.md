# 前端构建说明

页面（`src/public/*.html`）已**去除外部 CDN 依赖**，所有静态资源本地化并通过 Go `embed` 随二进制分发，离线/被墙环境也能正常加载。

## 资源说明

| 资源 | 位置 | 来源 |
|------|------|------|
| Tailwind 精简产物 | `src/public/app.css` | 由本目录构建生成 |
| FontAwesome 6.4.0 | `src/public/vendor/fontawesome/` | cdnjs 下载，本地托管 |
| Inter 字体 (400/500/600/700) | `src/public/vendor/inter/` | @fontsource，本地托管 |

`app.css` 由 Tailwind 扫描 `src/public/*.html`（含 JS 模板字符串里的类名）后**仅生成实际用到的工具类**，并内联了原先散落在各页面 `<style>` 中的自定义样式（`.glass`、`.gradient-text`、`.spinner`、滚动条、`animation-delay-*` 等）。

## 修改样式后如何重新生成

当你在 HTML 中**新增/修改了 Tailwind 类名**，或改动了 `web/input.css` / `web/tailwind.config.js`，需重新生成 `app.css`：

```bash
# 在仓库根目录执行（需要 Node.js）
npx --yes tailwindcss@3 -c web/tailwind.config.js -i web/input.css -o src/public/app.css --minify
```

生成后重新 `go build` 即可（`app.css` 会被 `//go:embed public/*` 打包进二进制）。

> 注意：`app.css` 是**构建产物但需提交**，因为它被嵌入二进制；不要手动编辑，改 `web/input.css` 或 HTML 后重新生成。
