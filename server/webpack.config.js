const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new webpack.NamedModulesPlugin()
];

if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}

const entry = isProduction ? [
    'babel-polyfill',
    path.resolve(path.join(__dirname, './app.js'))
] : [
    'webpack/hot/poll?1000',
    'babel-polyfill',
    path.resolve(path.join(__dirname, './app.js'))
];

module.exports = {
    mode: 'development',
    devtool: false,
    externals: [
        nodeExternals()
    ],
    name : 'server',
    plugins: plugins,
    target: 'node',
    entry: entry,
    output: {
        publicPath: './',
        path: path.resolve(__dirname, './dist'),
        filename: 'server.prod.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options : {
                    babelrc : true
                }
            }
        ],
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    }
};