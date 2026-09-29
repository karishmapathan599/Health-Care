import { pastMedications } from '../data/seedData.js'

export default function Prescriptions({ meds, onRequestRefill }) {
  return (
    <section className="view active">
      <div className="topbar"><div><h2>Prescriptions</h2><p>Current medications and refill requests.</p></div></div>

      <div className="card">
        <div className="card-head"><h3>Active medications</h3></div>
        {meds.map((m) => (
          <div className="med-card" key={m.id}>
            <div>
              <div className="name">{m.name}</div>
              <div className="detail">{m.freq} · prescribed by {m.doc}</div>
              <div className="refills">{m.refills} refill{m.refills === 1 ? '' : 's'} remaining</div>
            </div>
            <div className="actions">
              {m.status === 'requested' ? (
                <span className="pill pending">Refill requested</span>
              ) : (
                <button className={'btn sm' + (m.refills > 1 ? ' ghost' : '')} onClick={() => onRequestRefill(m.id)}>
                  Request refill
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><h3>Past medications</h3></div>
        {pastMedications.map((m) => (
          <div className="med-card" style={{ opacity: 0.7 }} key={m.id}>
            <div>
              <div className="name">{m.name}</div>
              <div className="detail">{m.freq}</div>
            </div>
            <span className="pill done">Completed</span>
          </div>
        ))}
      </div>
    </section>
  )
}
