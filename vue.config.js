const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    port:7001,
    proxy: {    //设置代理，必须填
      '': {   //设置拦截器  拦截器格式：斜杠+拦截器名
          target: 'http://localhost:8080',   //代理的目标地址
          changeOrigin: true,     //是否设置同源，输入是的
          // pathRewrite: {     //路径重写
          //     '': '' //选择忽略拦截器里面的内容
          // }
      }
  }
  }
})
