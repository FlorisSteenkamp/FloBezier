const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin").default;


module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: './src/test-bezier-intersection.ts',
    resolve: {
        extensions: [
            '.js', '.mjs', '.cjs', 
            '.jsx', '.cjsx', '.mjsx'
        ],
        plugins: [new ResolveTypeScriptPlugin({
            includeNodeModules: false
        })]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        // Don't display anything, then display colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    output: {
        filename: './perf.min.js',
        path: path.resolve(__dirname),
        library: {
            type: 'module'
        }
    },
    optimization: {
        minimize: false
    },
    experiments: {
        outputModule: true
    }
};