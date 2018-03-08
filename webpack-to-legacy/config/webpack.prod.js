const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
module.exports = webpackMerge(commonConfig(ENV),{
    devtool: 'source-map',
    output: {
        filename: "[name].[chunkhash].js",
      }
});