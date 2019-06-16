const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./index.tsx"),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "index.js",
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
  ],
  devServer: {
    contentBase: './demo',
    historyApiFallback: true,
    compress: true,
    port: 9000
  }
};
