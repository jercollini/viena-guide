import { Link } from 'react-router-dom'
import WeatherWidget from '../components/WeatherWidget'
import BlurText from '../components/BlurText'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { guide } from '../guide/config'

const menu = [
  { to: '/plan', icon: 'calendar', label: 'Plan día a día' },
  { to: '/lugares', icon: 'places', label: 'Lugares imprescindibles' },
  { to: '/comida', icon: 'food', label: 'Comida típica' },
  { to: '/transporte', icon: 'transport', label: 'Cómo moverse' },
  { to: '/frases', icon: 'phrases', label: 'Frases útiles' },
  { to: '/mapa', icon: 'map', label: 'Mapa' },
  { to: '/emergencias', icon: 'sos', label: 'Emergencias' },
]

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div
          className="hero__photo"
          style={{ backgroundImage: `url(${guide.heroImage})` }}
          aria-hidden="true"
        />
        <div className="hero__content">
          <div className="hero__eyebrow">{guide.days} {guide.days === 1 ? 'día' : 'días'} en</div>
          <h1 className="hero__title">
            <BlurText text={guide.city} />
          </h1>
          <p className="hero__subtitle">{guide.tagline}</p>
        </div>
      </section>

      <WeatherWidget />

      <p className="page-intro">Toca una opción para ver la información.</p>

      <div className="menu-grid">
        {menu.map((item, i) => (
          <Reveal key={item.to} delay={i * 60}>
            <Link to={item.to} className="menu-card">
              <span className="menu-card__icon" aria-hidden="true">
                <Icon name={item.icon} size={26} />
              </span>
              <span className="menu-card__label">{item.label}</span>
              <span className="menu-card__arrow" aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
