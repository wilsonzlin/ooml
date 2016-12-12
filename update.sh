#!/usr/bin/env bash

cd "$(dirname "$0")"
node compile.js
npm version $1
npm publish
git push