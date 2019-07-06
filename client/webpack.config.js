const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8081
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Src: path.join(__dirname, './src'),
            App: path.join(__dirname, './src/App.js'),
            Utils: path.join(__dirname, './src/utils'),
            Aciton: path.join(__dirname, './src/redux/actions'),
            Reducers: path.join(__dirname, './src/redux/reducers'),
            Apis: path.join(__dirname, './src/apis'),
            Components: path.join(__dirname, './src/component'),
            Configs: path.join(__dirname, './src/configs'),
            Config: path.join(__dirname, './src/configs/config.js'),
            Regex: path.join(__dirname, './src/configs/regular.config.js'),
           Image: path.join(__dirname, './src/images'),
            Middleware: path.join(__dirname, '../src/middleware'),
            Pages: path.join(__dirname, '.src/pages'),
            Style: path.join(__dirname, './src/styles'),
        },
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.(js|jsx)?$/,
                exclude: '/node_modules/',
                query:
                {
                    presets: [
                        "@babel/preset-react",
                        ["@babel/preset-env", { modules: false }],
                    ],
                }

                // Other settings, like include or exclude
            },
            // ...
            // Include less-loader (exact settings may deviate depending on your building/bundling procedure)
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'raw-loader',
                    }, {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {

                            javascriptEnabled: true,
                        },
                    }],
            },
            // Tell the DEFAULT sass-rule to ignore being used for sass imports in less files (sounds weird)
            {
                test: /\.scss$/,
                issuer: {
                    exclude: /\.less$/,
                },
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'raw-loader',
                    }, {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {

                            javascriptEnabled: true,
                        },
                    }],
                // ... other settings
            },
            // Tell the DEFAULT sass-rule to ignore being used for sass imports in less files (sounds weird)
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loader: ExtractTextPlugin.extract({
                    fallback: 'style', use: [
                        {
                            loader: 'css-loader',

                        }, {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                javascriptEnabled: true,
                            },
                        }],
                }),
                // ... other settings
            },
            // Define a second rule for only being used from less files
            // This rule will only be used for converting our sass-variables to less-variables
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'raw-loader',
                    },
                    { loader: "raw-loader" },
                ]
            },


            // ...
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.[hash:4].css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            dlls: [
                './src/resource/dll/vendor.dll.js', 
                './src/resource/dll/redux.dll.js',
              ],
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./src/resource/dll/vendor.manifest.json'),
            context: __dirname,
          }),
          new webpack.DllReferencePlugin({
            manifest: require('./src/resource/dll/redux.manifest.json'),
            context: __dirname,
          }),
    ]
}

