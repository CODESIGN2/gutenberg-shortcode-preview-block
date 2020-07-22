
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

var config = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'block.build.js',
	},
	module: {
		rules: [
			{
				test: /\/stories\/.+\.js$/,
				loaders: [ require.resolve( '@storybook/source-loader' ) ],
				enforce: 'pre',
			},
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
	plugins: [],
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'source-map';
	}

	if(process.env.WP_NO_EXTERNALS) {
		config.plugins.push(
			new DependencyExtractionWebpackPlugin( {
				injectPolyfill: true,
				outputFormat: 'json'
			})
		);
	}

	return config;
};