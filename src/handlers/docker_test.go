package handlers

import "testing"

func TestParseRegistryPath(t *testing.T) {
	tests := []struct {
		path      string
		image     string
		apiType   string
		reference string
	}{
		{"library/nginx/manifests/latest", "library/nginx", "manifests", "latest"},
		{"library/nginx/blobs/sha256:abc", "library/nginx", "blobs", "sha256:abc"},
		{"library/nginx/tags/list", "library/nginx", "tags", "list"},
	}

	for _, tt := range tests {
		image, apiType, reference := parseRegistryPath(tt.path)
		if image != tt.image || apiType != tt.apiType || reference != tt.reference {
			t.Fatalf("parseRegistryPath(%q) = %q %q %q", tt.path, image, apiType, reference)
		}
	}
}

func TestParseRegistryPathInvalid(t *testing.T) {
	image, apiType, reference := parseRegistryPath("library/nginx/unknown/latest")
	if image != "" || apiType != "" || reference != "" {
		t.Fatalf("invalid path parsed as %q %q %q", image, apiType, reference)
	}
}
