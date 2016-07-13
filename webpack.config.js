var path              = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'www/js/main.js')
	},
	output: {
		path:     path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js'
	},
	module: {
		loaders: [
			{ test: /\.html/, loaders: ['html?attrs[]=img:src&attrs[]=link:href'], exclude: 'node_modules' },
			{ test: /\.json/, loaders: ['file?name=[name].[hash].[ext]'], exclude: 'node_modules' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), exclude: 'node_modules' },
			{ test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['url?name=images/[name].[hash].[ext]&limit=10000', 'image-webpack'], exclude: 'node_modules' },
			{ test: /\.ttf$|\.eot$/, loaders: ['file?name=fonts/[name].[hash].[ext]'], exclude: 'node_modules' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?name=fonts/[name].[hash].[ext]&limit=10000'], exclude: 'node_modules' }
		]
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'www/CNAME' }]),
		new ExtractTextPlugin('[name].[hash].css'),
		new HtmlWebpackPlugin({ template: 'www/index.html' })
	],
	devServer: {
		port: 8000
	},
	devtool: 'source-map'
};
