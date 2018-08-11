'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	context: path.resolve('.'),
	resolve: {
		modules: [
			"node_modules"
		]
	},
	entry: path.resolve('./server/index.js'),
	output: {
		path: path.resolve('./server'),
		filename: 'server.bundle.js'
	},
	target: 'node',
	node: {
		console: true,
		__filename: false,
		__dirname: false
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/env', 'react-app'],
					plugins: [
						'@babel/syntax-dynamic-import',
						'dynamic-import-node-babel-7',
						['css-modules-transform', {
							generateScopedName: '[name]__[local]--[hash:base64:5]'
						}],
						'react-loadable/babel'
					]
				}
			}
		]
	}
}
