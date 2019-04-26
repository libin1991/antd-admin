'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mockUrlObj = require('./dev.mock')
const bodyParser = require('body-parser')

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
      { //antd样式处理
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
        ]
      },
      { // 正常网页中的样式处理
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            },
          }],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader',
      //   {
      //     loader: 'css-loader',
      //     options: {
      //       sourceMap: true,
      //       importLoaders: 1,
      //       modules: true,
      //       localIdentName: '[name]_[local]-[hash:base64:5]',
      //     },
      //   },
      //   {
      //     loader: 'less-loader',
      //     options: {
      //       sourceMap: true,
      //       javascriptEnabled: true,
      //     },
      //   }],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            },
          }
          ],
        }),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            },
          }],
        include: /node_modules/,
      }
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    // new UglifyPlugin(), 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new ExtractTextPlugin('index.css'),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: "initial",
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.(css|less)/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {},
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    publicPath: '/',
    before(app) {
      // 返回模拟请求数据
      Object.keys(mockUrlObj).forEach((key) => {
        const [type, url] = key.split(' ');
        app.use(url, bodyParser.json());
        if (type === 'GET') {
          app.get(url, mockUrlObj[key]);
        } else if (type === 'POST') {
          app.post(url, mockUrlObj[key]);
        }
      });
    },
    disableHostCheck: true   // 解决内网穿透之后 invalid Header 问题
  }
}
