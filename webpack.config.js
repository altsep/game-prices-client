const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const svelteConfig = require('./svelte.config');

const mode = process.env.NODE_ENV;
const production = mode === 'production';

module.exports = {
  entry: { bundle: './src/index.ts' },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    clean: true,
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        css: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2017',
        },
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            ...svelteConfig,
            sourceMap: !production,
            emitCss: production,
            compilerOptions: {
              dev: !production,
            },
            hotReload: !production,
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.png',
      inject: false,
    }),
    new Dotenv({ systemvars: true }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 3000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
