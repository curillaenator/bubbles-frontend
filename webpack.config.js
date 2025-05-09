const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[fullhash].js',
    publicPath: '/',
    clean: true,
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),

    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
    }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/public'),
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    new Dotenv(),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],

    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.module\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:12]',
                exportOnlyLocals: false,
                namedExport: false,
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(scss|css)$/i,
        exclude: /\.module\.(scss|css)$/i, // Исключаем CSS-модули
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      ,
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(m|c)?js$/i,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
