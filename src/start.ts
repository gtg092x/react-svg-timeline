import Koa from 'koa'
import { loadMiddleware } from './dist'
import { render } from './render'

async function main() {
  const app = new Koa()
  const dist = await loadMiddleware()

  app.use(dist)
  app.use(render)

  app.listen(3010)
}

main().catch(console.error)
