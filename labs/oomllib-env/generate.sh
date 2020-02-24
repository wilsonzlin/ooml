#!/usr/bin/env bash

set -e

pushd "$(dirname "$0")"

rm -f oomlc-core-env-gen-*.jar

mvn clean compile assembly:single
cp target/oomlc-core-env-gen-*.jar .

java -jar oomlc-core-env-gen-*.jar dec/* lib

popd

exit 0
