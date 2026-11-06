import { ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import ThemeSwitcher from './ThemeSwitcher'
import { guide } from '../guide/config'
import '../App.css'

const titles: Record<string, string> = {
  '/': guide.brand,
  '/plan': 'Plan día a día',
  '/lugares': 'Lugares imprescindibles',
  '/comida': 'Comida típica',
  '/transporte': 'Cómo moverse',
  '/frases': 'Frases útiles',
  '/emergencias': 'Emergencias',
  '/mapa': 'Mapa',
}

const navItems = [
  { to: '/', icon: 'home', label: 'Inicio' },
  { to: '/plan', icon: 'calendar', label: 'Plan' },
  { to: '/lugares', icon: 'places', label: 'Lugares' },
  { to: '/comida', icon: 'food', label: 'Comer' },
  { to: '/mapa', icon: 'map', label: 'Mapa' },
  { to: '/emergencias', icon: 'sos', label: 'SOS' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const title = titles[location.pathname] ?? guide.brand

  return (
    <>
      <header className="app-header">
        {!isHome && (
          <button
            className="app-header__back"
            onClick={() => navigate('/')}
            aria-label="Volver al inicio"
          >
            ←
          </button>
        )}
        <h1 className="app-header__title">{title}</h1>
        <ThemeSwitcher />
      </header>

      <main className="app-main">{children}</main>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              'bottom-nav__item' + (isActive ? ' active' : '')
            }
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
