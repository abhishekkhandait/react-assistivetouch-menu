const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index.js",
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	performance: {
		hints: false
	},
	devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
	module.exports.devtool = "#source-map";
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
