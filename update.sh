#!/usr/bin/env bash

set -e

pushd "$(dirname "$0")" > /dev/null

node compile.js
npm --no-git-tag-version version $1
npm publish

popd > /dev/null

exit 0
