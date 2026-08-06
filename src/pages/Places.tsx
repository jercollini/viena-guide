import { places } from '../data/places'
import PlaceImage from '../components/PlaceImage'
import Reveal from '../components/Reveal'

export default function Places() {
  return (
    <div>
      <p className="page-intro">
        Los lugares más bonitos e importantes de Viena. Toca «Cómo llegar» para
        abrir el mapa con la ruta.
      </p>
      {places.map((place, i) => (
        <Reveal key={place.id} delay={i * 40}>
          <article className="card">
            <PlaceImage place={place} />
            <div className="card__body">
              <span className="tag">{place.category}</span>
              <h2>{place.name}</h2>
              <p>{place.description}</p>
              <p className="address">📍 {place.address}</p>
              {place.tip && <div className="tip">💡 {place.tip}</div>}
              <a
                className="btn-link"
                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
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
