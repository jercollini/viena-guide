import { restaurants } from '../data/restaurants'
import Reveal from '../components/Reveal'

export default function Restaurants() {
  return (
    <div>
      <p className="page-intro">
        Sitios para comer cocina vienesa y cafés clásicos. Conviene reservar en
        los más conocidos.
      </p>
      {restaurants.map((r, i) => (
        <Reveal key={r.id} delay={i * 40}>
          <article className="card">
            <div className="card__body">
              <span className="tag">{r.cuisine}</span>
              <h2>{r.name}</h2>
              <p className="address">📍 {r.area}</p>
              <p>{r.note}</p>
              <a
                className="btn-link"
                href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🧭 Cómo llegar
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
