import { guide } from '../guide/config'
import { dishes } from '../guide/food'
import PlaceImage from '../components/PlaceImage'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function Food() {
  return (
    <div>
      <p className="page-intro">{guide.intro.food}</p>
      {dishes.map((dish, i) => (
        <Reveal key={dish.id} delay={i * 40}>
          <article className="card">
            {dish.image && <PlaceImage place={{ name: dish.name, image: dish.image }} />}
            <div className="card__body">
              <span className="tag">{dish.kind}</span>
              <h2>{dish.name}</h2>
              {dish.nameEs && <p className="dish__gloss">{dish.nameEs}</p>}
              <p>{dish.description}</p>
              {dish.tip && (
                <div className="tip">
                  <Icon name="bulb" size={17} /> <span>{dish.tip}</span>
                </div>
              )}
              {dish.spot && (
                <div className="dish__spot">
                  <span className="dish__spot-label">Dónde probarlo</span>
                  <strong>{dish.spot.name}</strong>
                  <span className="address">
                    <Icon name="pin" size={15} /> {dish.spot.area}
                  </span>
                  <a
                    className="btn-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${dish.spot.lat},${dish.spot.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="compass" size={18} /> Cómo llegar
                  </a>
                </div>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
