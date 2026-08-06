import { transport } from '../data/transport'

export default function Transport() {
  return (
    <div>
      <p className="page-intro">
        Cómo moverse por Viena de forma sencilla y cómoda.
      </p>
      {transport.map((item) => (
        <article key={item.title} className="card">
          <div className="card__body">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
