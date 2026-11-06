import { guide } from '../guide/config'
import { transport } from '../guide/transport'

export default function Transport() {
  return (
    <div>
      <p className="page-intro">{guide.intro.transport}</p>
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
