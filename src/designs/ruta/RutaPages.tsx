import { ReactNode, useState } from 'react'
import { guide } from '../../guide/config'
import { itinerary } from '../../guide/itinerary'
import { places } from '../../guide/places'
import { dishes } from '../../guide/food'
import { transport } from '../../guide/transport'
import { phraseGroups } from '../../guide/phrases'
import { emergencyContacts, emergencyTips } from '../../guide/emergency'
import Icon from '../../components/Icon'
import BigImg from '../BigImg'
import { dayImage, mapsUrl, placeById } from '../shared'

export function RtPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <article className="rt-page">
      <header className="rt-page__head">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </article>
  )
}

function Photo({ src, name, className }: { src?: string; name: string; className: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div className={className + ' rt-missing'} aria-hidden="true" />
  return <BigImg className={className} src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
}

function Go({ lat, lng, label = 'Cómo llegar' }: { lat: number; lng: number; label?: string }) {
  return (
    <a className="rt-btn" href={mapsUrl(lat, lng)} target="_blank" rel="noopener noreferrer">
      <Icon name="compass" size={18} /> {label}
    </a>
  )
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <p className="rt-tip">
      <Icon name="bulb" size={18} />
      <span>{children}</span>
    </p>
  )
}

export function RtPlaces() {
  return (
    <RtPage title="Lugares" intro={guide.intro.places}>
      <div className="rt-cards">
        {places.map((p, i) => (
          <article key={p.id} id={p.id} className="rt-card">
            <div className="rt-card__media">
              <Photo src={p.image} name={p.name} className="rt-card__img" />
              <div className="rt-card__over">
                <span className="rt-tag">
                  {String(i + 1).padStart(2, '0')} · {p.category}
                </span>
                <h2>{p.name}</h2>
              </div>
            </div>
            <div className="rt-card__body">
              <p>{p.description}</p>
              {p.tip && <Tip>{p.tip}</Tip>}
              <p className="rt-addr">
                <Icon name="pin" size={16} /> {p.address}
              </p>
              <Go lat={p.lat} lng={p.lng} />
            </div>
          </article>
        ))}
      </div>
    </RtPage>
  )
}

export function RtItinerary() {
  return (
    <RtPage title="Tu ruta" intro={guide.intro.itinerary}>
      {itinerary.map((d) => (
        <section key={d.day} id={`dia-${d.day}`} className="rt-day" aria-labelledby={`rt-h-${d.day}`}>
          <div className="rt-day__banner">
            <BigImg src={dayImage(d.day)} alt="" loading="lazy" />
            <div>
              <span className="rt-day__n">Día {d.day}</span>
              <h2 id={`rt-h-${d.day}`}>{d.title}</h2>
              {d.summary && <p>{d.summary}</p>}
            </div>
          </div>
          <ol className="rt-route">
            {d.stops.map((s, i) => {
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
        </section>
      ))}
    </RtPage>
  )
}

export function RtFood() {
  return (
    <RtPage title="Qué comer" intro={guide.intro.food}>
      <div className="rt-cards">
        {dishes.map((d) => (
          <article key={d.id} id={d.id} className="rt-card">
            {d.image && (
              <div className="rt-card__media rt-card__media--food">
                <Photo src={d.image} name={d.name} className="rt-card__img" />
              </div>
            )}
            <div className="rt-card__body">
              <span className="rt-tag rt-tag--solid">{d.kind}</span>
              <h2 className="rt-card__title">{d.name}</h2>
              {d.nameEs && <p className="rt-card__gloss">{d.nameEs}</p>}
              <p>{d.description}</p>
              {d.tip && <Tip>{d.tip}</Tip>}
              {d.spot && (
                <div className="rt-spot">
                  <span className="rt-k">Dónde probarlo</span>
                  <strong>{d.spot.name}</strong>
                  <span className="rt-addr">
                    <Icon name="pin" size={16} /> {d.spot.area}
                  </span>
                  <Go lat={d.spot.lat} lng={d.spot.lng} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </RtPage>
  )
}

export function RtTransport() {
  return (
    <RtPage title="Cómo moverse" intro={guide.intro.transport}>
      <div className="rt-stack">
        {transport.map((t) => (
          <article key={t.title} className="rt-panel">
            <h2>{t.title}</h2>
            <p>{t.body}</p>
          </article>
        ))}
      </div>
    </RtPage>
  )
}

export function RtPhrases() {
  return (
    <RtPage title="Frases útiles" intro={guide.intro.phrases}>
      {phraseGroups.map((g) => (
        <section key={g.group} className="rt-phrases" aria-label={g.group}>
          <h2 className="rt-sec__title">{g.group}</h2>
          <div className="rt-stack">
            {g.items.map((p) => (
              <div key={p.es} className="rt-phrase">
                <span className="rt-phrase__es">{p.es}</span>
                <strong>{p.local}</strong>
                <span className="rt-phrase__pron">
                  <Icon name="sound" size={15} /> {p.pron}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </RtPage>
  )
}

export function RtEmergency() {
  return (
    <RtPage title="Emergencias" intro={guide.intro.emergency}>
      <div className="rt-stack">
        {emergencyContacts.map((c) => (
          <div key={c.label} className="rt-panel rt-sos-row">
            <div>
              <span className="rt-k">{c.label}</span>
              <strong className="rt-sos-row__value">{c.value}</strong>
              {c.info && <p>{c.info}</p>}
            </div>
            {c.phone && (
              <a className="rt-call" href={`tel:${c.phone}`} aria-label={`Llamar al ${c.value} (${c.label})`}>
                <Icon name="phone" size={22} />
              </a>
            )}
          </div>
        ))}
      </div>
      <section className="rt-panel rt-panel--tips" aria-labelledby="rt-tips">
        <h2 id="rt-tips">Consejos</h2>
        <ul>
          {emergencyTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </RtPage>
  )
}
