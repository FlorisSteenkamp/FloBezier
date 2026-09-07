import type { Config } from 'jest';


const esModules = [
    'double-double',
    'big-float-ts',
    'flo-vector2d',
    'squares-rng',
    'flo-poly',
    'flo-gauss-quadrature',
    'flo-graham-scan'
].join('|');


const config: Config = {
    testEnvironment: 'node',
    resolver: "jest-ts-webcompat-resolver",
    setupFilesAfterEnv: ['<rootDir>/__tests__/helpers/jest.setup.ts'],
    testMatch: [ "**/__tests__/**/*.spec.ts"],
    // collectCoverage: true,
    collectCoverage: false,
    // coverageProvider: 'v8',
    testTimeout: 15000,
    // Only print the final summary (and any failing-test details); hides the
    // interactive "RUNS" spinner and per-file "PASS" lines from the default reporter.
    reporters: ['summary'],
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest"
    },
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ]
};


export default config;
