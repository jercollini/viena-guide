import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { guide } from '../../guide/config'
import { SECTIONS, pad, useScrollOnRoute } from '../shared'
import MapPage from '../../pages/MapPage'
import RevistaHome from './RevistaHome'
import { RvEmergency, RvFood, RvItinerary, RvPhrases, RvPlaces, RvTransport, RvPage } from './RevistaPages'
import './revista.css'

// "Revista": an editorial travel magazine. No tab bar: a full-screen index
// opened from the header, a cover as the home page and long-form sections.
export default function RevistaApp() {
  const { pathname, search } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  useScrollOnRoute(pathname, search)
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <div className="rv">
      <a className="rv-skip" href="#rv-main">Saltar al contenido</a>
      <header className={'rv-header' + (isHome ? ' rv-header--over' : '')}>
        {isHome ? (
          <span className="rv-header__brand">{guide.brand}</span>
        ) : (
          <Link className="rv-header__back" to="/">
            <span aria-hidden="true">←</span> {guide.city}
          </Link>
        )}
        <button
          type="button"
          className="rv-header__menu"
          aria-expanded={menuOpen}
          aria-controls="rv-index"
          onClick={() => setMenuOpen(true)}
        >
          <span>Índice</span>
          <span className="rv-burger" aria-hidden="true" />
        </button>
      </header>

      {menuOpen && <IndexOverlay onClose={() => setMenuOpen(false)} />}

      <main id="rv-main" className="rv-main" key={pathname}>
        <Routes>
          <Route path="/" element={<RevistaHome />} />
          <Route path="/plan" element={<RvItinerary />} />
          <Route path="/lugares" element={<RvPlaces />} />
          <Route path="/comida" element={<RvFood />} />
          <Route path="/restaurantes" element={<Navigate to="/comida" replace />} />
          <Route path="/transporte" element={<RvTransport />} />
          <Route path="/frases" element={<RvPhrases />} />
          <Route path="/emergencias" element={<RvEmergency />} />
          <Route
            path="/mapa"
            element={
              <RvPage kicker="Mapa" title={`${guide.city}, de un vistazo`}>
                <div className="rv-map">
                  <MapPage />
                </div>
              </RvPage>
            }
          />
          <Route path="*" element={<RevistaHome />} />
        </Routes>
      </main>

      <footer className="rv-footer">
        <p className="rv-footer__mark">{guide.city}</p>
        <nav aria-label="Secciones" className="rv-footer__nav">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to}>
              {s.label}
            </Link>
          ))}
        </nav>
        <p className="rv-footer__small">
          Una guía de {guide.brand} · Fotos: Wikimedia Commons · Mapa: Esri · Tiempo: Open-Meteo
        </p>
      </footer>
    </div>
  )
}

function IndexOverlay({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="rv-index" id="rv-index" role="dialog" aria-modal="true" aria-label="Índice" ref={ref}>
      <div className="rv-index__top">
        <span className="rv-index__kicker">
          {guide.city} · {guide.days} {guide.days === 1 ? 'día' : 'días'}
        </span>
        <button type="button" className="rv-index__close" onClick={onClose}>
          Cerrar <span aria-hidden="true">✕</span>
        </button>
      </div>
      <nav aria-label="Índice de la guía">
        <ol className="rv-index__list">
          <li>
            <NavLink to="/" end onClick={onClose}>
              <span className="rv-index__num">00</span> Portada
            </NavLink>
          </li>
          {SECTIONS.map((s, i) => (
            <li key={s.to} style={{ animationDelay: `${60 + i * 40}ms` }}>
              <NavLink to={s.to} onClick={onClose}>
                <span className="rv-index__num">{pad(i + 1)}</span> {s.label}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

