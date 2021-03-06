module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production'  ? false: true,
  outputDir: process.env.outputDir,
  devServer: {
    // 配置服务器代理
    proxy: {
      '/apis': {
        target: 'http://10.222.1.52:8084/',
        // websocket
        ws: true,
        // 是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
}