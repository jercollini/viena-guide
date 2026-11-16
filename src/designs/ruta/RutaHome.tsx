import { useState } from 'react'
import { Link } from 'react-router-dom'
import { guide } from '../../guide/config'
import { itinerary } from '../../guide/itinerary'
import { places } from '../../guide/places'
import { dishes } from '../../guide/food'
import { describe, useWeather } from '../../components/WeatherWidget'
import Icon from '../../components/Icon'
import BigImg from '../BigImg'
import { mapsUrl, placeById, useLocalTime } from '../shared'

const more = [
  { to: '/transporte', label: 'Cómo moverse', icon: 'transport' },
  { to: '/frases', label: 'Frases útiles', icon: 'phrases' },
  { to: '/mapa', label: 'Mapa', icon: 'map' },
  { to: '/emergencias', label: 'Emergencias', icon: 'sos' },
]

export default function RutaHome() {
  const { weather, error } = useWeather()
  const time = useLocalTime()
  const [day, setDay] = useState(itinerary[0]?.day ?? 1)
  const current = itinerary.find((d) => d.day === day)
  const tasty = dishes.filter((d) => d.image).slice(0, 6)

  return (
    <>
      <section className="rt-hero" aria-label="Portada">
        <BigImg className="rt-hero__photo" src={guide.heroImage} width={1280} alt="" fetchPriority="high" />
        <div className="rt-hero__text">
          <p className="rt-chips">
            <span>{guide.country}</span>
            <span>
              {guide.days} {guide.days === 1 ? 'día' : 'días'}
            </span>
            <span>{places.length} lugares</span>
          </p>
          <h1 className="rt-hero__city">{guide.city}</h1>
          <p className="rt-hero__tagline">{guide.tagline}</p>
        </div>
      </section>

      <section className="rt-pass" aria-label={`Ahora en ${guide.city}`}>
        <div className="rt-pass__cell">
          <span className="rt-k">Hora local</span>
          <strong className="rt-pass__big">{time}</strong>
        </div>
        <div className="rt-pass__cell">
          <span className="rt-k">Tiempo</span>
          <strong className="rt-pass__big">{weather ? `${weather.temp}°` : error ? '—' : '…'}</strong>
          <span className="rt-pass__small">{weather ? describe(weather.code).text : 'Ahora'}</span>
        </div>
        <div className="rt-pass__stub">
          <span className="rt-k">Idioma</span>
          <strong>{guide.language}</strong>
        </div>
      </section>

      <section className="rt-sec" aria-labelledby="rt-route">
        <div className="rt-sec__head">
          <h2 id="rt-route">Tu ruta</h2>
          <Link to="/plan" className="rt-link">
            Completa
          </Link>
        </div>
        <div
          className="rt-tabs"
          role="tablist"
          aria-label="Días"
          onKeyDown={(e) => {
            const i = itinerary.findIndex((d) => d.day === day)
            const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
            if (!step) return
            const next = itinerary[(i + step + itinerary.length) % itinerary.length]
            setDay(next.day)
            document.getElementById(`rt-tab-${next.day}`)?.focus()
          }}
        >
          {itinerary.map((d) => (
            <button
              key={d.day}
              type="button"
              role="tab"
              id={`rt-tab-${d.day}`}
              aria-selected={d.day === day}
              tabIndex={d.day === day ? 0 : -1}
              aria-controls="rt-daypanel"
              className="rt-tab"
              onClick={() => setDay(d.day)}
            >
              <span>Día</span> {d.day}
            </button>
          ))}
        </div>
        {current && (
          <div className="rt-daypanel" id="rt-daypanel" role="tabpanel" aria-labelledby={`rt-tab-${day}`} key={day}>
            <h3 className="rt-daypanel__title">{current.title}</h3>
            {current.summary && <p className="rt-daypanel__summary">{current.summary}</p>}
            <ol className="rt-route">
              {current.stops.map((s, i) => {
                const place = s.placeId ? placeById.get(s.placeId) : undefined
                return (
                  <li key={i} className="rt-route__stop">
                    <span className="rt-route__dot" aria-hidden="true" />
                    <span className="rt-k">{s.time}</span>
                    <p>{s.text}</p>
                    {place && (
                      <a className="rt-route__place" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noopener noreferrer">
                        <img src={place.image} alt="" loading="lazy" />
                        <span>
                          <strong>{place.name}</strong>
                          <small>
                            <Icon name="compass" size={14} /> Cómo llegar
                          </small>
                        </span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </section>

      <section className="rt-sec rt-sec--bleed" aria-labelledby="rt-places">
        <div className="rt-sec__head">
          <h2 id="rt-places">Imprescindibles</h2>
          <Link to="/lugares" className="rt-link">
            Ver {places.length}
          </Link>
        </div>
        <ul className="rt-stories">
          {places.map((p) => (
            <li key={p.id}>
              <Link to={`/lugares?go=${p.id}`} className="rt-story">
                <BigImg src={p.image} alt="" loading="lazy" />
                <span className="rt-story__text">
                  <span className="rt-tag">{p.category}</span>
                  <strong>{p.name}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {tasty.length > 0 && (
        <section className="rt-sec" aria-labelledby="rt-food">
          <div className="rt-sec__head">
            <h2 id="rt-food">Qué probar</h2>
            <Link to="/comida" className="rt-link">
              Todo
            </Link>
          </div>
          <ul className="rt-bento">
            {tasty.map((d) => (
              <li key={d.id}>
                <Link to={`/comida?go=${d.id}`} className="rt-bento__tile">
                  <BigImg src={d.image!} alt="" loading="lazy" />
                  <span>
                    <strong>{d.name}</strong>
                    {d.nameEs && <small>{d.nameEs}</small>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rt-sec" aria-labelledby="rt-more">
        <h2 id="rt-more" className="rt-sec__title">
          Útil
        </h2>
        <ul className="rt-tools">
          {more.map((m) => (
            <li key={m.to}>
              <Link to={m.to} className={'rt-tool' + (m.to === '/emergencias' ? ' rt-tool--sos' : '')}>
                <Icon name={m.icon} size={24} />
                <span>{m.label}</span>
                <Icon name="arrow" size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="rt-credit">
        {guide.brand} · Fotos: Wikimedia Commons · Tiempo: Open-Meteo
      </p>
    </>
  )
}
