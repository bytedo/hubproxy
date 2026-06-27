/** @type {import('tailwindcss').Config} */
// 本地化构建配置：扫描 src/public 下的 HTML（含 JS 模板字符串里的类名），
// 仅生成实际用到的工具类，产物输出到 src/public/app.css。
// 重新生成： npx tailwindcss@3 -c web/tailwind.config.js -i web/input.css -o src/public/app.css --minify
module.exports = {
  darkMode: 'class',
  content: ['./src/public/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: { 50: '#f0f9ff', 100: '#e0f2fe', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
        accent: { 400: '#34d399', 500: '#10b981', 600: '#059669' },
      },
      animation: {
        blob: 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
