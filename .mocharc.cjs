'use strict';

module.exports = {
    require: "ts-node/register",
    extension: ['ts', 'tsx'],
    spec: ['__tests__/**/*.spec.ts'],
    recursive: true,
    loader: ['ts-node/esm'],
    // slow: '75',
    // timeout: '2000',
    // ignore: ['/path/to/some/ignored/file'],
    color: true,
    diff: true,
    exit: false,
    parallel: true,
    timeout: '2000',
    'v8-stack-trace-limit': 100 // V8 flags are prepended with "v8-"
};