#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"
node compile.js
npm --no-git-tag-version version $1
npm publish
git push
