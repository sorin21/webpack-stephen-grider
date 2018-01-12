var webpack = require('webpack');
var path = require('path');
var HtmlWebapackPlugin = require('html-webpack-plugin');

// the names of the libraries used
const VENDOR_LIBS = ['faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'];

module.exports = {
	// multiple entry points
  entry: {
  	// create a file called bundle
  	bundle: './src/index.js',
  	// create vendor.js, a second bundle file
  	vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // naming bundle both files from entry
    // so we replace
    // filename: 'bundle.js'
    // name is the key for props from entry obj
    // chunkhash is a unique string of characters that will change
    // when we make a change in bundle or vendor
    filename: '[name].[chunkhash].js'
  },
  module: {
  	rules: [
  		{
  			use: 'babel-loader',
  			test: /\.js$/,
  			exclude: /node_modules/
  		},
  		{
  			use: ['style-loader', 'css-loader'],
  			test: /\.css$/
  		}
  	]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin({
  		// look to total output of bundle files
  		// and solve the double includes of libs
  		// on both bundle and vendor output
  		names: ['vendor', 'manifest']
  	}),
  	new HtmlWebapackPlugin({
  		// to take the existing configuration in index.html
  		// and add automatically bundle scripts
  		// to index.html bottom
  		template: 'src/index.html'
  	}),
  	new webpack.DefinePlugin({
  		// when React boots up looks for this property on windows scope
  		// DefinePlugin puts this prop on windows scope
  		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  	})
  ]
};
