
module.exports = {
  //将example目录添加为新的页面
  pages:{
    index:{
      //page入口
      entry:'examples/main.js',
      //模板来源
      template:'public/index.html',
      //输出文件
      filename:'index.html'
    }
  },
  baseUrl:'/',
  outputDir:'dist',
  lintOnSave: true,
  productionSourceMap:false,
  devServer:{
    open:true,//开启服务后是否打开浏览器
    host:'0.0.0.0',
    port:6000,
    https:false,
    hotOnly:false,
    proxy:null//设置代理
  }
}