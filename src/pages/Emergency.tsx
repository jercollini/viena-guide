import { guide } from '../guide/config'
import Icon from '../components/Icon'
import { emergencyContacts, emergencyTips } from '../guide/emergency'

export default function Emergency() {
  return (
    <div>
      <p className="page-intro">{guide.intro.emergency}</p>
      {emergencyContacts.map((c) => (
        <div key={c.label}>
          <div className="emergency-item">
            <div>
              <strong>{c.label}</strong>
              <div className="phrase__de">{c.value}</div>
            </div>
            {c.phone && (
              <a className="emergency-call" href={`tel:${c.phone}`}>
                <Icon name="phone" size={18} /> Llamar
              </a>
            )}
          </div>
          {c.info && <p className="address">{c.info}</p>}
        </div>
      ))}

      <article className="card" style={{ marginTop: 20 }}>
        <div className="card__body">
          <h2>Consejos</h2>
          <ul>
            {emergencyTips.map((tip) => (
              <li key={tip} style={{ marginBottom: 8 }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  )
}
