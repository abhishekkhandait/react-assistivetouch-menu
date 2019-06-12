const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./index.tsx",
  mode: 'development',
  output: {
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x|)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  performance: {
    hints: false
  },
  devtool: "none",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};
