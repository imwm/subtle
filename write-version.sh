#!/bin/bash

# read and increment patch
VERSION_FILE="version.json"
PATCH=$(jq '.patch' $VERSION_FILE)
PATCH=$((PATCH + 1))

# update json
jq --argjson p "$PATCH" '.patch = $p' $VERSION_FILE > tmp.json && mv tmp.json $VERSION_FILE

# extract all parts
MAJOR=$(jq '.major' $VERSION_FILE)
MINOR=$(jq '.minor' $VERSION_FILE)
PATCH=$(jq '.patch' $VERSION_FILE)

# write version.txt
echo "v$MAJOR.$MINOR.$PATCH" > version.txt

# print new version
echo "New version: v$MAJOR.$MINOR.$PATCH"