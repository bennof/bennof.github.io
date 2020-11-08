const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';
//const devMode = (argv.mode === 'development') ? true : false
 
module.exports = {
    devtool: 'source-map',
    entry: {
        //'index': [ SRC_DIR + '/index.html'],
        'edocore': [ SRC_DIR + '/index.js'],
        'edox': [ SRC_DIR + '/edox.js'],
        'style': [ SRC_DIR + '/style.js']    
    },
    output: {
        library: '[name]',
        libraryTarget: 'var',
        filename: '[name].js',
        path: DIST_DIR,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    devServer: {
        contentBase: DIST_DIR,
        compress: true,
        port: 9000
    }
};