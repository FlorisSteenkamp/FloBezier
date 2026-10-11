// const CircularDependencyPlugin = require('circular-dependency-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

module.exports = (env, argv) => {
    const isProd = argv && argv.mode === 'production';
    return {
    mode: isProd ? 'production' : 'development',
    // bundle the output compiled by `tsc` (i.e. run `tsc` first)
    entry: './node/demo/src/app.js',
    devtool: isProd ? false : 'eval-source-map',
    resolve: {
        // some imports omit the `.js` extension
        extensions: ['.js']
    },
    stats: {
        // Don't display anything, then add back colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    },
    plugins: [
        /*
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
        */
    ],
    optimization: {
        minimize: isProd
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: { type: 'module' }
    },
    experiments: {
        outputModule: true
    }
    };
};