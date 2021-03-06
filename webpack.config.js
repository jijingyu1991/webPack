const path = require('path');
const glob = require('glob')
const uglify = require('uglifyjs-webpack-plugin'); // 压缩js
const htmlPlugin = require('html-webpack-plugin');  // html发布
const extractTextPlugin = require("extract-text-webpack-plugin"); // 样式文件打包分离 
const PurifyCSSPlugin = require("purifycss-webpack"); // 消除未使用的css
const webpack = require('webpack');
const copyWebpackPlugin = require("copy-webpack-plugin");

const entry = require("./build/entry_webpack")

console.log( encodeURIComponent(process.env.type) );
// loader不需要引入，插件需要
if (process.env.type == 'build'){
  var website ={
    publicPath:"http://gtt.com:1711/"
  }
} else {
  var website ={
    publicPath:"http://192.168.0.101:1711/"
  }
}


module.exports={
  // devtool:'eval-source-map',
  //入口文件的配置项
  entry: entry.path,
  //出口文件的配置项
  output:{
    //打包的路径文职
    path:path.resolve(__dirname,'dist'),
    //打包的文件名称
    filename:'bundle.js',
    publicPath: website.publicPath
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules:[
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader'}
          ]
        })
        // 方法二：loader:['style-loader','css-loader']
        // 方法三：use[{
        //   loader: 'style-loader'
        // },{
        //   loader: 'css-loader'
        // }]
      },{
        test: /\.(png|jpg|gif)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit:5000,  // 图片大于5000字节拷贝图片生成路径，小于5000生成base64
            outputPath:'images/' // 图片在dis文件夹下的路径
          }
        }]
      },{
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader']
      },{
        test: /\.less$/,
        // use:[{
        //   loader: "style-loader" // creates style nodes from JS strings  loader 加载顺序不能变
        // }, {
        //    loader: "css-loader" // translates CSS into CommonJS
        // }, {
        //    loader: "less-loader" // compiles Less to CSS
      //  }]
      use: extractTextPlugin.extract({
        use: [{
          loader: "css-loader"
        },{
          loader: "less-loader"
        }],
        fallback: "style-loader"
      })
      },{
        test: /\.scss$/,
      //   use:[{
      //     loader: "style-loader" // creates style nodes from JS strings  loader 加载顺序不能变
      //   }, {
      //      loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //      loader: "sass-loader" // compiles Less to CSS
      //  }]
        use: extractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          },{
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },{
        test: /\.(jsx|js)$/,
        use:{
          loader: 'babel-loader',
          // options:{    // 一般写到.babelre文件中
          //   presets:[
          //     "es2015", "react"
          //   ]
          // }
        },
        exclude: /node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    // new uglify() // 压缩js
    new webpack.optimize.CommonsChunkPlugin({
      name:['jquerys','vue'],   // 对应入口文件的配置的对象名称
      filename: 'assets/js/[name].js',   //  抽离路径  [ext]扩展名跟随原文件,目前实测无效
      minChunks:2     // 最小抽离个数
    }),
    new webpack.ProvidePlugin({   // 加第三方库
      $:"jquery",
      JQuery:"jquery"
    }),
    new htmlPlugin({
      minify:{
        removeAttributeQuotes: true // 去掉html属性引号
      },
      hash: true,  // 这样可以有效避免缓存JS
      template: './src/index.html'   // 是要打包的html模版路径和文件名称
    }),
    new extractTextPlugin("css/index.css"),  // 分离后的路径位置
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))  // src下所有html应用的css
    }),
    new webpack.BannerPlugin('gtt author'), // 加版权
    new copyWebpackPlugin([{
      from:__dirname + '/src/public',
      to:'./public'
    }]),  // 静态资源集中输出
    new webpack.HotModuleReplacementPlugin()
  ],
  //配置webpack开发服务功能
  devServer:{  //webpack3.6开始webpack-dev-server直接支持热更新
    //设置基本目录结构
    contentBase:path.resolve(__dirname,'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: '192.168.0.101',
    //服务端压缩是否开启
    compress: true,
    //配置服务端口
    port: 1711
  },
  watchOptions:{
    // 检测修改的时间，以毫秒为单位
    poll:1000, 
    // 防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
    aggregateTimeout:500, 
    // 不监听的目录 没有双引号
    ignored:/node_modules/, 
  }
}
