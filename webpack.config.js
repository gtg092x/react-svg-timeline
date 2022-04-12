const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, './.client')

const { NODE_ENV = 'development' } = process.env

const gitState = require('git-state')

const GIT_HASH = gitState.commitSync()

const flags = [GIT_HASH]

console.log(path.resolve(DESTINATION, flags.join('-')))

module.exports = {
  mode: NODE_ENV,
  devtool: 'inline-source-map',
  context: ROOT,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  },
  entry: ['./main.tsx'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css',
    }),
  ],
  output: {
    filename: `[name].${NODE_ENV}.bundle.js`,
    publicPath: `/dist/`,
    path: path.resolve(DESTINATION),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.browser.ts', '.js', '.ts', '.tsx', '.mjs'],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
}
