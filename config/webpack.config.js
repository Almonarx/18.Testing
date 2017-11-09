const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const textPlugin = require('extract-text-webpack-plugin');
const args = require('yargs').argv;

let styleLoader = ['style-loader', 'css-loader', 'sass-loader'];

const plugins = [
    new HtmlPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.HotModuleReplacementPlugin()
];

if (args.env && args.env.style) {
    plugins.push(
        new textPlugin({
            filename: 'main.css'
        })
    );

    styleLoader = textPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
    });
}

module.exports = {
    entry: {
        main: './app.js',
        vendor: ['jquery']
    },
    context: path.resolve(__dirname, 'src'),
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: !(args.env && args.env.style),
        publicPath: '/',
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: styleLoader
            }
        ]
    },

    plugins
};