const utils = require('./utils')
var path = require('path');
const md = require('markdown-it')//引入markdown-it
const MarkdownItContainer = require('markdown-it-container');
const slugify = require('transliteration').slugify;
const striptags = require('./strip-tags')
// var webpack = require('webpack')
const vueMarkdown = {
  //定义处理规则
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">'
    }
    //对于代码块去除v-pre 添加高亮样式
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
    return source
  },
  use: [
    [require('markdown-it-anchor'),{
      level:2,//添加超链接锚点的最小标题级别 如：#标题不会添加锚点
      slugify:slugify,//自定义slugify 我们使用的是将中文转换成汉语拼音 最终胜出标题id属性
      permalink:false,//开启标题锚点
      permalinkBefore:true//在标题前创建锚点
    }],
    //MarkdownItContainer 的作用是自定义代码块
    [MarkdownItContainer, 'demo', {
      // 当我们写:::demo:::这样的语法时候才进入自定义渲染方法
      validate: params =>{
        return params.trim().match(/^demo\s*(.*)$/)
      },
      render: function(tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          //获取正则捕获组件中的描述内容 即:::demo xxx 中的xxx
          var description = (m&&m.length>1)?m[1]:'';
          //获得内容
          var content = tokens[idx + 1].content;
          //解析过滤解码生成html字符串
          var html = utils.convertHtml(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
          //是否有描述需要渲染
          var descriptionHtml = description?md.render(description):'';
          return `<demo-block class="demo-box">
                        <div slot="source" class="source">${html}</div>
                        ${descriptionHtml}
                        <div slot="highlight" class="highlight">`;
        }
        return '</div></demo-block>\n';
      }
    }],
    [require('markdown-it-container'),'tip'],
    [require('markdown-it-container'),'warning']
  ]
}

module.exports = env =>{
  let lib = env && env.lib
  return {
    // 入口文件
    entry: lib? './packages/index.js':'./examples/main.js',
    // 出口文件
    output: {
      // 打包文件生成的路径
      path: path.resolve(__dirname, lib?'./lib':'./dist'),
      publicPath: lib?'/lib/':'./',
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
        },
        {
          test: /\.md$/,
          loader: 'vue-markdown-loader',
          options:vueMarkdown
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
}
