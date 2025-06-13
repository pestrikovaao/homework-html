const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",

  entry: "./src/main.tsx",

  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",                     // чтобы все ассеты отдавались с корня
    assetModuleFilename: "img/[hash][ext][query]" // дефолт для всех asset/resource
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource"
        // т.к. мы задали assetModuleFilename в output, здесь никаких опций не нужно
      }
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist")
    },
    hot: true,
    open: true,
    historyApiFallback: true
  }
};
