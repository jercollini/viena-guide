import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { guide } from '../../guide/config'
import Icon from '../../components/Icon'
import MapPage from '../../pages/MapPage'
import { useScrollOnRoute } from '../shared'
import RutaHome from './RutaHome'
import { RtEmergency, RtFood, RtItinerary, RtPage, RtPhrases, RtPlaces, RtTransport } from './RutaPages'
import './ruta.css'

const dock = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/plan', label: 'Ruta', icon: 'calendar' },
  { to: '/lugares', label: 'Lugares', icon: 'places' },
  { to: '/comida', label: 'Comer', icon: 'food' },
  { to: '/mapa', label: 'Mapa', icon: 'map' },
]

// "Ruta": a dark, photo-led travel companion. Full-bleed pictures, a
// floating dock for navigation and SOS always one tap away.
export default function RutaApp() {
  const { pathname, search } = useLocation()
  const isHome = pathname === '/'
  useScrollOnRoute(pathname, search)

  return (
    <div className="rt">
      <a className="rt-skip" href="#rt-main">Saltar al contenido</a>
      <header className={'rt-top' + (isHome ? ' rt-top--over' : '')}>
        {isHome ? (
          <span className="rt-top__brand">{guide.brand}</span>
        ) : (
          <>
            <Link to="/" className="rt-top__back" aria-label="Volver al inicio">
              <span aria-hidden="true">←</span>
            </Link>
            <span className="rt-top__title">{guide.city}</span>
          </>
        )}
        <Link to="/emergencias" className="rt-sos" aria-label="Emergencias">
          SOS
        </Link>
      </header>

      <main id="rt-main" className="rt-main" key={pathname}>
        <Routes>
          <Route path="/" element={<RutaHome />} />
          <Route path="/plan" element={<RtItinerary />} />
          <Route path="/lugares" element={<RtPlaces />} />
          <Route path="/comida" element={<RtFood />} />
          <Route path="/restaurantes" element={<Navigate to="/comida" replace />} />
          <Route path="/transporte" element={<RtTransport />} />
          <Route path="/frases" element={<RtPhrases />} />
          <Route path="/emergencias" element={<RtEmergency />} />
          <Route
            path="/mapa"
            element={
              <RtPage title="Mapa" intro={`Todo ${guide.city} en un mapa.`}>
                <div className="rt-map">
                  <MapPage />
                </div>
              </RtPage>
            }
          />
          <Route path="*" element={<RutaHome />} />
        </Routes>
      </main>

      <nav className="rt-dock" aria-label="Navegación principal">
        {dock.map((d) => (
          <NavLink key={d.to} to={d.to} end={d.to === '/'} className={({ isActive }) => 'rt-dock__item' + (isActive ? ' is-active' : '')}>
            <Icon name={d.icon} size={21} />
            <span>{d.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
