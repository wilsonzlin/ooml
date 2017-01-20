#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"
node compile.js
npm version $1
npm publish
git push
