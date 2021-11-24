
export default function(wallaby) {
    return {
        files: [
            'package.json',
            'src/**/*.ts',
            'test/helpers/*.ts'
        ],

        tests: [
            'test/**/*.spec.ts'
            // 'test/boxes/are-boxes-intersecting.spec.ts'
        ],

        testFramework: 'mocha',

        compilers: {
            "**/*.+(t)s?": wallaby.compilers.typeScript()
        },

        env: {
            type: 'node'
        },

        setup: function () {
            // globalThis.expect = chai.expect;
            // var should = chai.should();
        },

        workers: { restart: true }
    };
};
