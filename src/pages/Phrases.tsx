import { phraseGroups } from '../data/phrases'
import Icon from '../components/Icon'

export default function Phrases() {
  return (
    <div>
      <p className="page-intro">
        Frases básicas en alemán con una pronunciación aproximada (leedla como
        si fuera español).
      </p>
      {phraseGroups.map((group) => (
        <section key={group.group} className="phrase-group">
          <h2>{group.group}</h2>
          {group.items.map((p) => (
            <div key={p.es} className="phrase">
              <div className="phrase__es">{p.es}</div>
              <div className="phrase__de">{p.de}</div>
              <div className="phrase__pron"><Icon name="sound" size={15} /> {p.pron}</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
