import React from 'react'

export function HTML({ content }: { content: string }) {
  return (
    <html>
      <head>
        <title>Timeline</title>
      </head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="/dist/vendors.development.bundle.js" type="text/javascript" />
        <script src="/dist/main.development.bundle.js" type="text/javascript" />
      </body>
    </html>
  )
}
