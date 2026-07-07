import { createDefaultEsmPreset } from 'ts-jest';
import type { Config } from 'jest';


const esModules = [
    'squares-rng', 'flo-poly',
    'flo-gauss-quadrature', 'flo-graham-scan',
    'flo-vector2d', 'big-float-ts', 'double-double'
].join('|');

/** @type {import('ts-jest').JestConfigWithTsJest} */

const config: Config = {
    ...createDefaultEsmPreset({}),
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testEnvironment: 'node',
    resolver: "jest-ts-webcompat-resolver",
    setupFilesAfterEnv: ['<rootDir>/__tests__/helpers/jest.setup.ts'],
    testMatch: [ "**/__tests__/**/*.spec.ts"],
    // collectCoverage: true,
    collectCoverage: false,
    // coverageProvider: 'v8',
    testTimeout: 15000,
    // transform: { "^.+\\.(t|j)sx?$": "@swc/jest" },
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest', 
            {
                useESM: true,
                tsconfig: 'tsconfig.spec.json',
                // Allow ts-jest to transpile plain .js deps (e.g. ESM-only
                // packages like squares-rng) that are allow-listed above.
                allowJs: true,
            },
        ],
    },
    // moduleNameMapper: {
    //     '^(\\.{1,2}/.+)\\.js$': '$1', // Remove .js extension from imports
    // },
    
};


export default config;