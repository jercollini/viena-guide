import { Link } from 'react-router-dom'
import { guide } from '../../guide/config'
import { itinerary } from '../../guide/itinerary'
import { places } from '../../guide/places'
import { dishes } from '../../guide/food'
import { describe, useWeather } from '../../components/WeatherWidget'
import Icon from '../../components/Icon'
import BigImg from '../BigImg'
import { SECTIONS, dayImage, pad, useLocalTime } from '../shared'

const thumbs: Record<string, string | undefined> = {
  '/plan': dayImage(1),
  '/lugares': places[1]?.image ?? guide.heroImage,
  '/comida': dishes.find((d) => d.image)?.image,
}

export default function RevistaHome() {
  const { weather } = useWeather()
  const time = useLocalTime()
  // Masthead size: the city name fills the width whatever its length.
  const mastSize = `min(${Math.min(26, 118 / guide.city.length).toFixed(1)}vw, ${Math.round(
    (Math.min(26, 118 / guide.city.length) * 620) / 100,
  )}px)`
  const dishList = dishes.filter((d) => d.image).slice(0, 4)

  return (
    <>
      <section className="rv-cover" aria-label="Portada">
        <BigImg className="rv-cover__photo" src={guide.heroImage} width={1280} alt="" fetchPriority="high" />
        <div className="rv-cover__top">
          <p className="rv-cover__issue">
            <span>Guía de viaje</span>
            <span>{guide.country}</span>
          </p>
          <h1 className="rv-cover__mast" style={{ fontSize: mastSize }} data-overlap-ok="tight line-height: the font box, not the capitals, reaches the line above">
            {guide.city}
          </h1>
          <p className="rv-cover__issue rv-cover__issue--rule">
            <span>
              {guide.days} {guide.days === 1 ? 'día' : 'días'}
            </span>
            <span>{guide.brand}</span>
          </p>
        </div>
        <div className="rv-cover__lines">
          <p className="rv-cover__tagline">{guide.tagline}</p>
          <ul>
            {itinerary.slice(0, 3).map((d) => (
              <li key={d.day}>
                <span>Día {d.day}</span> {d.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rv-now" aria-label={`Ahora en ${guide.city}`}>
        <div>
          <span className="rv-label">Hora local</span>
          <strong>{time}</strong>
        </div>
        <div>
          <span className="rv-label">Tiempo</span>
          <strong>{weather ? `${weather.temp}°` : '—'}</strong>
          {weather && <span className="rv-now__desc">{describe(weather.code).text}</span>}
        </div>
        <div>
          <span className="rv-label">Idioma</span>
          <strong className="rv-now__word">{guide.language}</strong>
        </div>
      </section>

      <section className="rv-block" aria-labelledby="rv-contents">
        <h2 id="rv-contents" className="rv-block__title">
          En esta guía
        </h2>
        <ol className="rv-contents">
          {SECTIONS.map((s, i) => (
            <li key={s.to}>
              <Link to={s.to} className="rv-contents__row">
                <span className="rv-contents__num">{pad(i + 1)}</span>
                <span className="rv-contents__label">{s.label}</span>
                {thumbs[s.to] ? (
                  <img src={thumbs[s.to]} alt="" loading="lazy" className="rv-contents__thumb" />
                ) : (
                  <span className="rv-contents__icon" aria-hidden="true">
                    <Icon name={s.icon} size={22} />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="rv-block" aria-labelledby="rv-days">
        <div className="rv-block__head">
          <h2 id="rv-days" className="rv-block__title">
            El viaje, día a día
          </h2>
          <Link className="rv-more" to="/plan">
            Ver el plan
          </Link>
        </div>
        <div className="rv-days">
          {itinerary.map((d) => (
            <Link key={d.day} to={`/plan?go=dia-${d.day}`} className="rv-day">
              <span className="rv-day__num" aria-hidden="true" data-overlap-ok="outline numeral behind the title">
                {pad(d.day)}
              </span>
              <span className="rv-day__text">
                <span className="rv-label">Día {d.day}</span>
                <span className="rv-day__title">{d.title}</span>
                {d.summary && <span className="rv-day__summary">{d.summary}</span>}
              </span>
              <span className="rv-day__photo">
                <BigImg src={dayImage(d.day)} alt="" loading="lazy" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rv-block rv-block--bleed" aria-labelledby="rv-places">
        <div className="rv-block__head">
          <h2 id="rv-places" className="rv-block__title">
            Imprescindibles
          </h2>
          <Link className="rv-more" to="/lugares">
            Los {places.length}
          </Link>
        </div>
        <ul className="rv-rail">
          {places.map((p, i) => (
            <li key={p.id}>
              <Link to={`/lugares?go=${p.id}`} className="rv-rail__card">
                <span className="rv-rail__photo">
                  <BigImg src={p.image} alt="" loading="lazy" />
                </span>
                <span className="rv-label">
                  {pad(i + 1)} · {p.category}
                </span>
                <span className="rv-rail__name">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <blockquote className="rv-quote">
        <p>{guide.intro.food}</p>
      </blockquote>

      {dishList.length > 0 && (
        <section className="rv-block" aria-labelledby="rv-food">
          <div className="rv-block__head">
            <h2 id="rv-food" className="rv-block__title">
              A la mesa
            </h2>
            <Link className="rv-more" to="/comida">
              Toda la comida
            </Link>
          </div>
          <ul className="rv-dishes">
            {dishList.map((d) => (
              <li key={d.id}>
                <Link to={`/comida?go=${d.id}`} className="rv-dishes__card">
                  <span className="rv-dishes__photo">
                    <img src={d.image} alt="" loading="lazy" />
                  </span>
                  <span className="rv-dishes__name">{d.name}</span>
                  {d.nameEs && <span className="rv-dishes__gloss">{d.nameEs}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rv-help" aria-labelledby="rv-help">
        <h2 id="rv-help">¿Algo no va bien?</h2>
        <p>Teléfonos de emergencia y del consulado, a un toque.</p>
        <Link to="/emergencias" className="rv-btn rv-btn--light">
          <Icon name="phone" size={18} /> Ver emergencias
        </Link>
      </section>
    </>
  )
}
