import { Link } from 'react-router-dom'
import WeatherWidget from '../components/WeatherWidget'
import BlurText from '../components/BlurText'
import Reveal from '../components/Reveal'

const menu = [
  { to: '/lugares', icon: '📸', label: 'Lugares imprescindibles' },
  { to: '/restaurantes', icon: '🍽️', label: 'Dónde comer' },
  { to: '/transporte', icon: '🚋', label: 'Cómo moverse' },
  { to: '/frases', icon: '💬', label: 'Frases útiles' },
  { to: '/mapa', icon: '🗺️', label: 'Mapa' },
  { to: '/emergencias', icon: '🆘', label: 'Emergencias' },
]

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero__aurora" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__eyebrow">4 días en</div>
          <h1 className="hero__title">
            <BlurText text="Viena" />
          </h1>
          <p className="hero__subtitle">Vuestra guía, sencilla y a mano.</p>
        </div>
      </section>

      <WeatherWidget />

      <p className="page-intro">Toca una opción para ver la información.</p>

      <div className="menu-grid">
        {menu.map((item, i) => (
          <Reveal key={item.to} delay={i * 60}>
            <Link to={item.to} className="menu-card">
              <span className="menu-card__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="menu-card__label">{item.label}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
