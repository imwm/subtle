#!/bin/bash

# Script to add Three.js and logo3d.js to all HTML files

# Find all HTML files (excluding node_modules and other directories)
find . -name "*.html" -type f | while read file; do
  # Skip if file doesn't contain the script pattern we're looking for
  if grep -q "scripts/keyboard-shortcuts.js" "$file"; then
    # Check if Three.js is already added
    if ! grep -q "three.js" "$file"; then
      # Use sed to add the scripts after keyboard-shortcuts.js
      sed -i '' '/scripts\/keyboard-shortcuts.js/a\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>\
    <script src="scripts/logo3d.js"><\/script>
' "$file"
      echo "Updated: $file"
    else
      echo "Already updated: $file"
    fi
  fi
done

echo "Done!"

