const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index.js",
		libraryTarget: 'umd',
		library: 'ReactAssistivetouchMenu'
	},
	module: {
		rules: [
			{
				test: /\.ts(x|)?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
				},
			},
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			"react": path.resolve(__dirname, "./node_modules/react"),
			"react-dom": path.resolve(__dirname, "./node_modules/react-dom")
		}
	},
	performance: {
		hints: false
	},
	devtool: "none",
	externals: {
		"react": {
			commonjs: "react",
			commonjs2: "react",
			amd: "react",
			root: "React"
		},
		"react-dom": {
			commonjs: "react-dom",
			commonjs2: "react-dom",
			amd: "react-dom",
			root: "ReactDOM"
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
};