const NODE_ENV = process.env.NODE_ENV || "development";
var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  context: path.join(__dirname, "source"),
  entry: {
    app: "./js/app",
    style: "./css/style"
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "./js/[name].js",
    library: "[name]",
    publicPath: "/public/"
  },
  resolve: {
    modules: [
      "node_modules"
    ],

    extensions: [".js", ".scss"]
  },
  resolveLoader: {
    modules: ["node_modules"],
    moduleExtensions: ["-loader"]
  },
  devtool: false,
  watch: NODE_ENV === "development",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          filename: "bundle.css",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: NODE_ENV !== "development"
              }
            },
            "postcss-loader",
            "sass-loader"
          ],
        })
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ['env', 'react'],
        }
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {loader: 'url-loader?name=[path][name].[ext]&limit=4096'}
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader?name=[path][name].[ext]&limit=4096'
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/build.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons"
    // }),
  ]
};

if(NODE_ENV === "production") {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false,
      drop_console: true,
      unsafe: true
    },
    output: {
      comments: false
    }
  }))
}

console.log(NODE_ENV);

if (NODE_ENV === "production") {
  module.exports.output.filename = "js/[name].min.js";
}
