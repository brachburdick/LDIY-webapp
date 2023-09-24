// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";


const config = {
    entry: ['./client/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        open: true,
        host: "localhost",
      },
      
    plugins: [
        // new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: './client/index.html',
        }),
        
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                // options: { presets: ['@babel/env','@babel/preset-react'] },
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader',
                ],
              },
            {
                test: /\.(mov|mp4|eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
                  
            },
            
        ],
    },  
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'], // ensure .ts and .tsx are included
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "net": false,
            "tls": false,
          },
      },

      
   
};

module.exports = () => {

   
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
