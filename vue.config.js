
module.exports = {
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