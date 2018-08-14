const webpack = require('webpack')

const productionConfig = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]

module.exports = {
  context: __dirname,
  entry: "./src/client/js/App.js",
  devtool: "cheap-eveal-source-map",
  output: {
    path: `${__dirname}/public/js`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: process.NODE_ENV === 'production' ? prodConfig : []
}
