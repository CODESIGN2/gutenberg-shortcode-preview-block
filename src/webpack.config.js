module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /.scss$/,
				loader: 'sass-loader',
			}
		],
	},
};
