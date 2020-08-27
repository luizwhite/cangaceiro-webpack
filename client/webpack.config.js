const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [];
const devServiceURL = 'http://localhost:3000';
const prodServiceURL = 'http://endereco-da-sua-api';

plugins.push(
  new HtmlWebpackPlugin({
    hash: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    filename: 'index.html',
    template: `${__dirname}/main.html`,
  })
);
plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
    // chunkFilename: '[id].css',
  })
);
plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  })
);

module.exports = (env) => {
  let SERVICE_URL = JSON.stringify(devServiceURL);
  if (env && env.production) {
    const isProd = env.production;
    if (isProd) SERVICE_URL = JSON.stringify(prodServiceURL);
  }

  plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

  return {
    entry: {
      app: ['./app-src/vendor.js', './app-src/app.js'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
          extractComments: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            test: /\.css$/,
            name: 'styles',
            chunks: 'all',
            enforce: true,
            priority: 10,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/css/',
              },
            },
            'css-loader',
          ],
        },
      ],
    },
  };
};
