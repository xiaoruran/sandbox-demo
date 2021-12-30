const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        paths: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src'),
        ],
      },
    },
  },
  configureWebpack:{
    resolve:{extensions:[".ts",".tsx",".js",".json"]},
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo:[/\.vue$/],
          }
        }
      ]
    }
  }
}