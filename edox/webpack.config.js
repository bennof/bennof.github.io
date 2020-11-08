const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';
//const devMode = (argv.mode === 'development') ? true : false
 
module.exports = {
    devtool: 'source-map',
    entry: {
        'style': [ SRC_DIR + '/style.js'],
        'edox': [ SRC_DIR + '/index.js']
    },
    output: {
        library: '[name]',
        libraryTarget: 'var',
        filename: '[name].js',
        path: DIST_DIR,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
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
            template: SRC_DIR + '/html/index.html',
            filename: 'index.html'
        }),
        new CopyPlugin({ // partials
            patterns: [
                { from: SRC_DIR + '/html/partials/*.html', to: DIST_DIR + '/partials', flatten: true,},
                { from: SRC_DIR + '/html/content/*.html', to: DIST_DIR +'/content', flatten: true, }
            ]
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