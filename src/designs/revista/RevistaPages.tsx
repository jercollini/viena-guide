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
import { mapsUrl, pad, placeById } from '../shared'

export function RvPage({ kicker, title, intro, children }: { kicker: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <article className="rv-page">
      <header className="rv-page__head">
        <p className="rv-label">{kicker}</p>
        <h1 className="rv-page__title">{title}</h1>
        {intro && <p className="rv-page__intro">{intro}</p>}
      </header>
      {children}
    </article>
  )
}

/** Wikimedia photo; if it fails, a paper block with the name. */
function Photo({ src, name, className }: { src?: string; name: string; className: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={className + ' rv-photo-missing'} aria-hidden="true">
        <span>{name}</span>
      </div>
    )
  }
  return <BigImg className={className} src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
}

function Directions({ lat, lng }: { lat: number; lng: number }) {
  return (
    <a className="rv-btn" href={mapsUrl(lat, lng)} target="_blank" rel="noopener noreferrer">
      <Icon name="compass" size={18} /> Cómo llegar
    </a>
  )
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <aside className="rv-tip">
      <span className="rv-label">Consejo</span>
      <p>{children}</p>
    </aside>
  )
}

export function RvPlaces() {
  return (
    <RvPage kicker="Lugares" title={`Lo imprescindible de ${guide.city}`} intro={guide.intro.places}>
      {places.map((p, i) => (
        <section key={p.id} id={p.id} className="rv-feature" aria-labelledby={`h-${p.id}`}>
          <Photo src={p.image} name={p.name} className="rv-feature__photo" />
          <div className="rv-feature__body">
            <p className="rv-feature__meta">
              <span className="rv-feature__num">{pad(i + 1)}</span>
              <span className="rv-label">{p.category}</span>
              <span className="rv-feature__of">de {pad(places.length)}</span>
            </p>
            <h2 id={`h-${p.id}`} className="rv-feature__title">
              {p.name}
            </h2>
            <p className="rv-feature__text">{p.description}</p>
            {p.tip && <Tip>{p.tip}</Tip>}
            <p className="rv-address">
              <Icon name="pin" size={16} /> {p.address}
            </p>
            <Directions lat={p.lat} lng={p.lng} />
          </div>
        </section>
      ))}
    </RvPage>
  )
}

export function RvItinerary() {
  return (
    <RvPage kicker="Plan" title={`${guide.days} ${guide.days === 1 ? 'día' : 'días'} en ${guide.city}`} intro={guide.intro.itinerary}>
      {itinerary.map((d) => (
        <section key={d.day} id={`dia-${d.day}`} className="rv-chapter" aria-labelledby={`h-dia-${d.day}`}>
          <header className="rv-chapter__head">
            <span className="rv-chapter__num" aria-hidden="true">
              {pad(d.day)}
            </span>
            <div>
              <p className="rv-label">Día {d.day}</p>
              <h2 id={`h-dia-${d.day}`} className="rv-chapter__title">
                {d.title}
              </h2>
              {d.summary && <p className="rv-chapter__summary">{d.summary}</p>}
            </div>
          </header>
          <ol className="rv-timeline">
            {d.stops.map((s, j) => {
              const place = s.placeId ? placeById.get(s.placeId) : undefined
              return (
                <li key={j} className="rv-timeline__stop">
                  <span className="rv-timeline__time">{s.time}</span>
                  <p className="rv-timeline__text">{s.text}</p>
                  {place && (
                    <a className="rv-timeline__place" href={mapsUrl(place.lat, place.lng)} target="_blank" rel="noopener noreferrer">
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
    </RvPage>
  )
}

export function RvFood() {
  return (
    <RvPage kicker="Comida típica" title={`La carta de ${guide.city}`} intro={guide.intro.food}>
      <ol className="rv-menu">
        {dishes.map((d, i) => (
          <li key={d.id} id={d.id} className="rv-dish">
            {d.image && <Photo src={d.image} name={d.name} className="rv-dish__photo" />}
            <div className="rv-dish__line">
              <h2 className="rv-dish__name">{d.name}</h2>
              <span className="rv-dish__dots" aria-hidden="true" />
              <span className="rv-label">{d.kind}</span>
            </div>
            {d.nameEs && <p className="rv-dish__gloss">{d.nameEs}</p>}
            <p className="rv-dish__text">{d.description}</p>
            {d.tip && <Tip>{d.tip}</Tip>}
            {d.spot && (
              <div className="rv-dish__spot">
                <span className="rv-label">Dónde probarlo</span>
                <strong>{d.spot.name}</strong>
                <span className="rv-address">
                  <Icon name="pin" size={16} /> {d.spot.area}
                </span>
                <Directions lat={d.spot.lat} lng={d.spot.lng} />
              </div>
            )}
            <span className="rv-dish__num" aria-hidden="true">
              {pad(i + 1)}
            </span>
          </li>
        ))}
      </ol>
    </RvPage>
  )
}

export function RvTransport() {
  return (
    <RvPage kicker="Cómo moverse" title={`Moverse por ${guide.city}`} intro={guide.intro.transport}>
      <ol className="rv-list">
        {transport.map((t, i) => (
          <li key={t.title}>
            <span className="rv-list__num">{pad(i + 1)}</span>
            <div>
              <h2>{t.title}</h2>
              <p>{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </RvPage>
  )
}

export function RvPhrases() {
  return (
    <RvPage kicker="Frases útiles" title={`Un poco de ${guide.language}`} intro={guide.intro.phrases}>
      {phraseGroups.map((g) => (
        <section key={g.group} className="rv-phrases" aria-labelledby={`h-${g.group}`}>
          <h2 id={`h-${g.group}`} className="rv-phrases__group">
            {g.group}
          </h2>
          <dl>
            {g.items.map((p) => (
              <div key={p.es} className="rv-phrase">
                <dt>{p.local}</dt>
                <dd>
                  <span className="rv-phrase__es">{p.es}</span>
                  <span className="rv-phrase__pron">«{p.pron}»</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </RvPage>
  )
}

export function RvEmergency() {
  return (
    <RvPage kicker="Emergencias" title="Por si acaso" intro={guide.intro.emergency}>
      <ul className="rv-sos">
        {emergencyContacts.map((c) => (
          <li key={c.label} className="rv-sos__item">
            <div>
              <span className="rv-label">{c.label}</span>
              <strong className="rv-sos__value">{c.value}</strong>
              {c.info && <p className="rv-sos__info">{c.info}</p>}
            </div>
            {c.phone && (
              <a className="rv-btn rv-btn--call" href={`tel:${c.phone}`}>
                <Icon name="phone" size={18} /> Llamar
              </a>
            )}
          </li>
        ))}
      </ul>
      <section className="rv-tips" aria-labelledby="h-consejos">
        <h2 id="h-consejos">Consejos</h2>
        <ul>
          {emergencyTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </RvPage>
  )
}
