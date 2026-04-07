import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')

// Build the SSR bundle first, then render
async function prerender() {
  const { build } = await import('vite')

  // Build SSR bundle
  await build({
    build: {
      ssr: join(__dirname, '..', 'src', 'entry-server.jsx'),
      outDir: join(distPath, 'server'),
      rollupOptions: { output: { format: 'es' } },
    },
    logLevel: 'warn',
  })

  // Load the SSR bundle and render
  const { render } = await import(join(distPath, 'server', 'entry-server.js'))
  const html = render()

  // Read the client-built index.html and inject rendered content
  const indexPath = join(distPath, 'index.html')
  const indexHtml = readFileSync(indexPath, 'utf-8')
  const finalHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  )
  writeFileSync(indexPath, finalHtml)

  // Clean up server bundle
  const { rmSync } = await import('fs')
  rmSync(join(distPath, 'server'), { recursive: true })

  console.log('Pre-rendered index.html successfully')
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  // Don't fail the build — the site still works without pre-rendering
  process.exit(0)
})
