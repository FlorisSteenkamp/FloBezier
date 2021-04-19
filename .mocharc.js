'use strict';

module.exports = {
    //spec: ['./test/**/*.spec.ts'],
    spec: ['./test/intersection/bezier-bezier-intersection/intersection-performance.spec.ts'],
    require: ['ts-node/register', 'source-map-support/register'],
    recursive: true,
    color: true,
    diff: true,
    exit: false,
    package: './package.json',
    parallel: true,
    timeout: '2000',
    'v8-stack-trace-limit': 100 // V8 flags are prepended with "v8-"
};