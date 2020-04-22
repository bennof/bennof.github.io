const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/tabularrasa.js',
    output: {
        library: 'TR',
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, './'),
    },
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test:  /\.(css|sass|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: true
                    }
              },
              {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')
                    ],
                    sourceMap: true
                }
              },
              {
                loader: 'sass-loader', 
                options: {
                  sourceMap: true,
                }
              },
            ],
          },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "simple.css",
        }),
        new CopyPlugin([
            { from: './src/static/', to: './' },
        ]),
    ]
};