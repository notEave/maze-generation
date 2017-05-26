#!/bin/bash

PATH=$(npm bin):$PATH tsc
PATH=$(npm bin):$PATH browserify javascript/Main.js -o bundle.js
