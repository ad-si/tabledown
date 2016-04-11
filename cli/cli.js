#! /usr/bin/env node

const transformStream = require('../build/transformStream').default

transformStream(process.stdin, process.stdout)
