
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const projectRoot = '../';


module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.d.ts' ],
        alias: {
            'flo-poly$':                path.resolve(__dirname, projectRoot + 'poly/src/index.ts'),
            //'flo-vector2d$':            path.resolve(__dirname, projectRoot + 'vector/src/index.ts'),
            //'double-double$':           path.resolve(__dirname, projectRoot + 'double-double/src/index.ts'),
            //'big-float-ts$':            path.resolve(__dirname, projectRoot + 'big-float/src/index.ts'),
        }
    },
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'browser'),
        library: 'FloBezier',
        libraryTarget: 'var'
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ]
};