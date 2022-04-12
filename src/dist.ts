export async function loadMiddleware() {
  const webpack = require('webpack')
  const config = require('../webpack.config.js')
  const koaWebpack = require('koa-webpack')

  const compiler = webpack(config)
  return koaWebpack({ compiler })
}
