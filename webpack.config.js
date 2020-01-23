const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  
  module: {
    rules: [{
      test: /\.(tsx)$/,
      include: __dirname,
      exclude: /node_modules/,
      use:{
          options: {
            configFileName: 'tsconfig.json',
            useTranspileModule: true,
            forceIsolatedModules: true,
            useCache: true,
            useBabel: true,
            babelOptions: {
              babelrc: false /* Important line */
            },
            babelCore: '@babel/core'
          },
          loader: 'awesome-typescript-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
};