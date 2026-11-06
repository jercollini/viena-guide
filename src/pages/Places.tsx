import { guide } from '../guide/config'
import { places } from '../guide/places'
import PlaceImage from '../components/PlaceImage'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function Places() {
  return (
    <div>
      <p className="page-intro">{guide.intro.places}</p>
      {places.map((place, i) => (
        <Reveal key={place.id} delay={i * 40}>
          <article className="card">
            <PlaceImage place={place} />
            <div className="card__body">
              <span className="tag">{place.category}</span>
              <h2>{place.name}</h2>
              <p>{place.description}</p>
              <p className="address"><Icon name="pin" size={15} /> {place.address}</p>
              {place.tip && <div className="tip"><Icon name="bulb" size={17} /> <span>{place.tip}</span></div>}
              <a
                className="btn-link"
                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
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
