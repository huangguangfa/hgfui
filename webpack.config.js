var path = require('path');
// var webpack = require('webpack')


module.exports = env =>{
  let lib = env.lib
  return {
    // 入口文件
    entry: lib? './packages/index.js':'./examples/main.js',
    // 出口文件
    output: {
      // 打包文件生成的路径
      path: path.resolve(__dirname, lib?'./lib':'./dist'),
      publicPath: lib?'/lib/':'/dist/',
      // 打包后的文件名
      filename: lib?'gfui.js':'build.js',
      /**
       * library 指的是用户使用时的require的模块名
       * 这里既是require('gfui')
       */
      library: lib?'gfui':'',
      libraryTarget: lib?'umd':'var',
      umdNamedDefine: !!lib
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        },      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }

  // if (process.env.NODE_ENV === 'production') {
  //   module.exports.devtool = '#source-map'
  //   // http://vue-loader.vuejs.org/en/workflow/production.html
  //   module.exports.plugins = (module.exports.plugins || []).concat([
  //     new webpack.DefinePlugin({
  //       'process.env': {
  //         NODE_ENV: '"production"'
  //       }
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({
  //       sourceMap: true,
  //       compress: {
  //         warnings: false
  //       }
  //     }),
  //     new webpack.LoaderOptionsPlugin({
  //       minimize: true
  //     })
  //   ])
  // }
}
