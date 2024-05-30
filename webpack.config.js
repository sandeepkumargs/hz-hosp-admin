/** Webpack config File
 * Entry point is declared in this file (./src/index.html)
 * Only js and jsx files can be processed
 * Babel, file and style loaders involved
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
   ],
   devtool: 'inline-source-map',
   devServer: {
      hot: true,
      historyApiFallback: true,
      host: '0.0.0.0'
   },
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               'style-loader',
               'css-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     implementation: require('sass'),
                     sassOptions: {
                        fiber: false,
                     },
                  },
               },
            ],
         },
         {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
         },
         { test: /\.css$/, use: ['style-loader', 'css-loader'] },
         { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
         { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
         {
            test: /\.html$/,
            use: [
               {
                  loader: 'html-loader',
                  options: { minimize: true },
               },
            ],
         },
         {
            test: /\.(png|jpg|gif)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {},
               },
            ],
         },
      ],
   },
};
