// Layout check: opens every route of a guide in every design, at phone
// widths, and fails on text drawn over other text or sideways scrolling.
// jsdom tests cannot see positions; this catches what they miss.
//
//   npm run check:layout                      # this repo
//   npm run check:layout -- ../lisboa-guide   # other guide repos
//
// Uses $CHROME_PATH when set, else Playwright's Chromium
// (`npx playwright install chromium` once per machine).
// An intended overlay is marked in the markup with data-overlap-ok="<why>".
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { createServer } from 'vite'

const DESIGNS = ['app', 'revista', 'ruta']
const ROUTES = ['', 'plan', 'lugares', 'comida', 'transporte', 'frases', 'emergencias', 'mapa']
const WIDTHS = [390, 320]

const dirs = process.argv.slice(2).filter((a) => !a.startsWith('-'))
if (!dirs.length) dirs.push('.')

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
let total = 0

for (const dir of dirs) {
  const root = resolve(dir)
  const server = await createServer({ root, configFile: resolve(root, 'vite.config.ts'), logLevel: 'error', server: { port: 0, strictPort: false } })
  await server.listen()
  const base = server.resolvedUrls.local[0]
  console.log(`\n${root}`)
  let problems = 0

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: 'reduce' })
    // Weather is a third-party call; answer it locally so runs are stable.
    await page.route('https://api.open-meteo.com/**', (r) =>
      r.fulfill({ json: { current: { temperature_2m: 18, weather_code: 3 } } }),
    )
    for (const design of DESIGNS) {
      for (const route of ROUTES) {
        // A query change reloads the page, so every check starts clean.
        await page.goto(`${base}?design=${design}&w=${width}&r=${route}#/${route}`, { waitUntil: 'networkidle' }).catch(() => {})
        await page.waitForTimeout(400)
        const found = await page.evaluate(findProblems)
        for (const f of found) {
          problems++
          console.log(`  ${width}px ${design} /${route}: ${f}`)
        }
      }
    }
    await page.close()
  }
  await server.close()
  console.log(problems ? `  ${problems} problem(s)` : '  ok')
  total += problems
}

await browser.close()
process.exit(total ? 1 : 0)

// Runs in the page.
function findProblems() {
  const out = []
  const pinned = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const pos = getComputedStyle(e).position
      if (pos === 'fixed' || pos === 'sticky') return true
    }
    return false
  }
  const boxes = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const node = walker.currentNode
    const el = node.parentElement
    if (!node.textContent.trim() || !el || pinned(el)) continue
    if (el.closest('.leaflet-container, [data-overlap-ok], [hidden], .sr-only, .rv-skip, .rt-skip')) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue
    const range = document.createRange()
    range.selectNodeContents(node)
    for (const r of range.getClientRects()) {
      if (r.width > 2 && r.height > 2) boxes.push({ el, text: node.textContent.trim().slice(0, 30), x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height })
    }
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i]
      const b = boxes[j]
      if (a.el === b.el) continue
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
      if (ox > 3 && oy > 3) out.push(`text over text: «${a.text}» / «${b.text}»`)
    }
  }
  const sw = document.documentElement.scrollWidth
  const cw = document.documentElement.clientWidth
  if (sw > cw + 1) out.push(`sideways scroll: ${sw}px wide in a ${cw}px screen`)
  return [...new Set(out)]
}
