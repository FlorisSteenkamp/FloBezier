const path = require('path');
const projectRoot = '../../';


module.exports = {
    entry: './src/bezier-bezier-intersection.ts',
    mode: 'development',
    //devtool: undefined,
    //mode: 'production',
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
            'flo-poly$': path.resolve(__dirname, projectRoot + 'poly/src/index.ts'),
        }
    },
    output: {
        filename: './perf.min.js',
        path: path.resolve(__dirname)
    },
    stats: {
        // Don't display anything, then display colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};