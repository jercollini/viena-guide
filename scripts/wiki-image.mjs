#!/usr/bin/env node
// Prints a stable Wikimedia thumbnail URL for each Wikipedia article title.
//   node scripts/wiki-image.mjs [--lang es|en|pt|…] [--width 800] "Torre de Belém" "Sé de Lisboa"
// Use the result as `image` in src/guide/places.ts (or `heroImage` with --width 1200).
const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf(name)
  if (i < 0) return def
  const v = args[i + 1]
  args.splice(i, 2)
  return v
}
const lang = opt('--lang', 'en')
const width = opt('--width', '800')
if (!args.length) {
  console.error('Usage: node scripts/wiki-image.mjs [--lang en] [--width 800] "Title" ...')
  process.exit(1)
}

const api = new URL(`https://${lang}.wikipedia.org/w/api.php`)
api.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  redirects: '1',
  prop: 'pageimages',
  piprop: 'thumbnail',
  pithumbsize: width,
  titles: args.join('|'),
}).toString()

const res = await fetch(api, { headers: { 'User-Agent': 'travel-guide-kit/1.0 (image lookup script)' } })
const data = await res.json()
const pages = Object.values(data.query?.pages ?? {})
const norm = new Map()
for (const n of [...(data.query?.normalized ?? []), ...(data.query?.redirects ?? [])]) norm.set(n.from, n.to)
const resolveTitle = (t) => {
  let cur = t
  for (let i = 0; i < 3 && norm.has(cur); i++) cur = norm.get(cur)
  return cur
}
let missing = 0
for (const title of args) {
  const page = pages.find((p) => p.title === resolveTitle(title))
  const url = page?.thumbnail?.source?.split('?')[0]
  if (!url) missing++
  console.log(`${title}\t${url ?? 'NOT FOUND'}`)
}
process.exit(missing ? 2 : 0)
