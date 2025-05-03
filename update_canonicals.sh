#!/bin/bash

shopt -s extglob

for file in !(index|new-post-template).html; do
  if [[ -f "$file" ]]; then
    canonical_url="https://subtle.so/$file"
    echo "Processing $file -> $canonical_url"
    
    # Use a temporary file for sed changes
    tmp_file="${file}.tmp"
    
    # Replace canonical URL placeholder
    sed "s|<link rel=\"canonical\" href=\"https://subtle.so/\\[article-url\\].html\" />|<link rel=\"canonical\" href=\"$canonical_url\" />|g" "$file" > "$tmp_file" && mv "$tmp_file" "$file"
    
    # Replace og:url placeholder
    sed "s|meta property=\"og:url\" content=\"https://subtle.so/\\[article-url\\].html\"|meta property=\"og:url\" content=\"$canonical_url\"|g" "$file" > "$tmp_file" && mv "$tmp_file" "$file"
    
    # Replace twitter:url placeholder
    sed "s|meta property=\"twitter:url\" content=\"https://subtle.so/\\[article-url\\].html\"|meta property=\"twitter:url\" content=\"$canonical_url\"|g" "$file" > "$tmp_file" && mv "$tmp_file" "$file"

    # Handle cases where canonical might be missing or different - Add if not found
    # Check if canonical link exists
    if ! grep -q '<link rel="canonical"' "$file"; then
        echo "  Adding missing canonical tag to $file using awk"
        # Use awk to add canonical link after <title> tag
        awk -v url="$canonical_url" '
        /<title>/ { print; print "    <link rel=\"canonical\" href=\"" url "\" />"; next }
        { print }
        ' "$file" > "$tmp_file" && mv "$tmp_file" "$file"
    fi

  fi
done

# Clean up any remaining temp files just in case
rm -f *.html.tmp

echo "Finished updating files." 