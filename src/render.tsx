import React from 'react'

import { Context, Next } from 'koa'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { App } from './App'
import { HTML } from './HTML'

export async function render(ctx: Context, next: Next) {
  if (ctx.accepts('text/html')) {
    const content = renderToString(<App />)
    ctx.body = `<!doctype html>${renderToStaticMarkup(<HTML content={content} />)}`
    ctx.set('content-type', 'text/html')
  }

  return next()
}
