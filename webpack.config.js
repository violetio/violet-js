const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (_env, _argv) => {
  return {
    mode: 'production',
    target: 'web',
    entry: {
      index: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
      path: path.resolve(__dirname, 'dist/umd'), // builds to ./dist/umd/
      filename: '[name].js', // index.js
      library: '@violetio/violet-js',
      libraryTarget: 'umd', // supports commonjs, amd and web browsers
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
