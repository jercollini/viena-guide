import { guide } from '../guide/config'
import { restaurants } from '../guide/restaurants'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function Restaurants() {
  return (
    <div>
      <p className="page-intro">{guide.intro.restaurants}</p>
      {restaurants.map((r, i) => (
        <Reveal key={r.id} delay={i * 40}>
          <article className="card">
            <div className="card__body">
              <span className="tag">{r.cuisine}</span>
              <h2>{r.name}</h2>
              <p className="address"><Icon name="pin" size={15} /> {r.area}</p>
              <p>{r.note}</p>
              <a
                className="btn-link"
                href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="compass" size={18} /> Cómo llegar
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
