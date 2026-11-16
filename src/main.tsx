import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { guide } from './guide/config'
import { DESIGN_FONTS, resolveDesign } from './designs/shared'
import './index.css'
import 'leaflet/dist/leaflet.css'

document.title = `${guide.city} · ${guide.brand}`

const design = resolveDesign()
document.documentElement.dataset.design = design
const fonts = DESIGN_FONTS[design]
if (fonts) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fonts
  document.head.appendChild(link)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App design={design} />
    </HashRouter>
  </React.StrictMode>,
)
