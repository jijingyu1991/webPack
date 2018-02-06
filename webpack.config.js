const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); // 压缩js
const htmlPlugin = require('html-webpack-plugin');
module.exports={
  //入口文件的配置项
  entry:{
    entry:'./src/entry.js'
  },
  //出口文件的配置项
  output:{
    //打包的路径文职
    path:path.resolve(__dirname,'dist'),
    //打包的文件名称
    filename:'bundle.js'
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules:[
      {
        test: /\.css$/,
        use:['style-loader','css-loader']  
        // 方法二：loader:['style-loader','css-loader']
        // 方法三：use[{
        //   loader: 'style-loader'
        // },{
        //   loader: 'css-loader'
        // }]
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    // new uglify() // 压缩js
    new htmlPlugin({
      minify:{
        removeAttributeQuotes: true // 去掉html属性引号
      },
      hash: true,  // 这样可以有效避免缓存JS
      template: './src/index.html'   // 是要打包的html模版路径和文件名称
    })
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
  }
}
