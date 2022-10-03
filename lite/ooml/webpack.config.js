'use strict';

const TerserJsPlugin = require('terser-webpack-plugin');
const {join} = require('path');

const resolveRelativeToProject = relativePath => join(__dirname, relativePath);

const TSCONFIG = resolveRelativeToProject('tsconfig.json');
const SRC = resolveRelativeToProject('src');
const SRC_MAIN_TS = resolveRelativeToProject('src/main.ts');
const DIST = resolveRelativeToProject('dist');

module.exports = {
  devtool: 'source-map',
  entry: SRC_MAIN_TS,
  output: {
    path: DIST,
    filename: 'main.js',
    library: 'ooml',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC,
        use: [
          {loader: 'ts-loader', options: {configFile: TSCONFIG}},
        ],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
