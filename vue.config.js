const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
  },
  devServer: {
    // host: '192.168.0.2', // ip
    //port: 8081, // 设置端口号
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        //这里最好有一个 /
        target: 'http://192.168.0.127:8360', // 后台接口域名
        changeOrigin: true, //是否跨域
      },
    },
  },
}
