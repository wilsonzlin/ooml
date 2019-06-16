#!/usr/bin/env bash

set -e

pushd "$(dirname "$0")" > /dev/null

node submodules/libooml/compile/compile.js ooml.js "$@"

popd > /dev/null

exit 0
