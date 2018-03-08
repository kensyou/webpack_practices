const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function(options) {
  return {
    entry: path.resolve(__dirname, "../../SomeLegacy/Scripts/app", "index.js"),
    output: {
      path: path.resolve(__dirname, "../../SomeLegacy/Scripts/dist")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      modules: [path.resolve(__dirname, "../node_modules"), "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader:
              "babel-loader?babelrc=false&extends=" +
              path.join(__dirname, "../.babelrc")
          }
        },
        {
          test: /\.ts?$/,
          use: [
            { loader: "cache-loader" },
            {
              loader: "thread-loader",
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                workers: require("os").cpus().length - 1
              }
            },
            {
              loader: "ts-loader",
              options: {
                configFile: path.resolve(__dirname, "tsconfig.json"),
                happyPackMode: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "../SomeLegacy/Scripts/app/index.html",
        filename: "./index.html"
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, "./tsconfig.json"),
        checkSyntacticErrors: true
      })
    ]
  };
};
