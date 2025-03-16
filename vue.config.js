const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  publicPath: './',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          VUE_APP_MODE: JSON.stringify(process.env.VUE_APP_MODE),
          VUE_APP_ENV: JSON.stringify(process.env.VUE_APP_ENV),
        },
      }),
    ],
  },
})
