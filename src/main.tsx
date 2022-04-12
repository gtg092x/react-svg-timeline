import React from 'react'
import { App } from './App'
import { hydrate } from 'react-dom'

async function main() {
  hydrate(
    <App />,
    // @ts-ignore
    document.getElementById('react-root')
  )
}

main().catch(console.error)
