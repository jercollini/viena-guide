import { guide } from '../guide/config'
import { itinerary } from '../guide/itinerary'
import { places } from '../guide/places'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

const placeById = new Map(places.map((p) => [p.id, p]))

export default function Itinerary() {
  return (
    <div>
      <p className="page-intro">{guide.intro.itinerary}</p>
      {itinerary.map((day, i) => (
        <Reveal key={day.day} delay={i * 50}>
          <section className="day" aria-labelledby={`day-${day.day}`}>
            <header className="day__header">
              <span className="day__badge">Día {day.day}</span>
              <h2 id={`day-${day.day}`}>{day.title}</h2>
              {day.summary && <p className="day__summary">{day.summary}</p>}
            </header>
            <ol className="day__stops">
              {day.stops.map((stop, j) => {
                const place = stop.placeId ? placeById.get(stop.placeId) : undefined
                return (
                  <li key={j} className="stop">
                    <span className="stop__time">{stop.time}</span>
                    <div className="stop__body">
                      <p className="stop__text">{stop.text}</p>
                      {place && (
                        <a
                          className="stop__place"
                          href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={place.image} alt="" loading="lazy" />
                          <span>
                            <strong>{place.name}</strong>
                            <small>
                              <Icon name="compass" size={14} /> Cómo llegar
                            </small>
                          </span>
                        </a>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        </Reveal>
      ))}
    </div>
  )
}
