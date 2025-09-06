#!/bin/bash

set -euo pipefail

base_url="https://www.subtle.so"
root_dir="/workspace"
output_file="$root_dir/sitemap.xml"

# Generate ISO 8601 date (YYYY-MM-DD) for lastmod
get_lastmod() {
  local file_path="$1"
  date -u -d "$(stat -c %y "$file_path")" +%F
}

{
  echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
  echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"

  # Homepage entry from index.html
  if [[ -f "$root_dir/index.html" ]]; then
    lastmod_home="$(get_lastmod "$root_dir/index.html")"
    echo "  <url>"
    echo "    <loc>${base_url}/</loc>"
    echo "    <lastmod>${lastmod_home}</lastmod>"
    echo "    <changefreq>weekly</changefreq>"
    echo "    <priority>1.0</priority>"
    echo "  </url>"
  fi

  shopt -s nullglob
  pushd "$root_dir" >/dev/null
  for file in *.html; do
    # Skip index and template files
    [[ "$file" == "index.html" ]] && continue
    [[ "$file" == "new-post-template.html" ]] && continue

    lastmod="$(get_lastmod "$file")"
    echo "  <url>"
    echo "    <loc>${base_url}/${file}</loc>"
    echo "    <lastmod>${lastmod}</lastmod>"
    echo "    <changefreq>monthly</changefreq>"
    echo "    <priority>0.8</priority>"
    echo "  </url>"
  done
  popd >/dev/null

  echo "</urlset>"
} > "$output_file"

echo "Wrote sitemap to $output_file"