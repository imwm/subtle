#!/bin/bash

# Fix href="public/ references
find . -name "*.html" -type f -exec sed -i '' 's/href="public\//href="\//' {} \;

# Fix src="public/ references
find . -name "*.html" -type f -exec sed -i '' 's/src="public\//src="\//' {} \;

echo "All path references to the public directory have been fixed." 