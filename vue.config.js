const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Khi deploy Vue app vào thư mục gốc (httpdocs)
  publicPath: '/',
  filenameHashing: true ,
  // Fix 404 khi reload trang hoặc vào subpath
  devServer: {
    historyApiFallback: true
  },

  // ✅ TẮT thread-loader để tránh lỗi khi build (Node 20 + vue-cli)
  chainWebpack: (config) => {
    config.module.rule('js').uses.delete('thread-loader')
  }
})