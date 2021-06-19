module.exports = {
  publicPath: "./", // 基本路径
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://file.nmxgzs.cn',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/DataApi': {
        target: 'http://api.xuandan.com/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/tbk': {
        target: 'http://82.156.117.112:9191/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      }
    },



  }
}
