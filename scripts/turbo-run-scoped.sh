#!/bin/sh
yarn turbo run $1 --scope=$2 --no-deps --includeDependencies ${@:3}