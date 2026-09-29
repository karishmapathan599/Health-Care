import RowItem from '../components/RowItem.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { RecordsIcon } from '../components/Icons.jsx'
import { visitHistory, seedDocuments } from '../data/seedData.js'
import { fmtDate } from '../utils/format.js'

export default function MedicalRecords() {
  return (
    <section className="view active">
      <div className="topbar"><div><h2>Medical Records</h2><p>Visit history and lab/imaging documents.</p></div></div>

      <div className="card">
        <div className="card-head"><h3>Visit history</h3></div>
        <div className="table-wrap">
          <table className="records">
            <thead>
              <tr><th>Date</th><th>Provider</th><th>Reason</th><th>Summary</th></tr>
            </thead>
            <tbody>
              {visitHistory.map((v) => (
                <tr key={v.date + v.provider}>
                  <td className="mono">{fmtDate(v.date)}</td>
                  <td>{v.provider}</td>
                  <td>{v.reason}</td>
                  <td>{v.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>Lab &amp; imaging documents</h3></div>
        {seedDocuments.map((d) => (
          <RowItem
            key={d.name}
            icon={<RecordsIcon />}
            title={d.name}
            subtitle={fmtDate(d.date)}
            meta={
              <>
                <StatusPill status={d.status} />
                {d.status === 'ready' && <button className="btn ghost sm">View</button>}
              </>
            }
          />
        ))}
      </div>
    </section>
  )
}
