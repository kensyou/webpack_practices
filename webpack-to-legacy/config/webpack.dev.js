const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
module.exports = webpackMerge(commonConfig(ENV),{
    cache: true,
    devtool: 'eval',
    output: {
        filename: "main.js",
      }
});