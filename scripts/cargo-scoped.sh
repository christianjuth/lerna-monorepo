#!/bin/sh
cd ./rust && cargo $1 --bin $2 ${@:3}