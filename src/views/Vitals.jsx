import { useState } from 'react'
import VitalsChart from '../components/VitalsChart.jsx'
import { metricMeta, TODAY_ISO } from '../data/seedData.js'
import { fmtDate } from '../utils/format.js'

const TABS = ['bp', 'weight', 'glucose', 'hr']

export default function Vitals({ vitals, onLog }) {
  const [tab, setTab] = useState('bp')
  const [metric, setMetric] = useState('bp')
  const [sys, setSys] = useState('')
  const [dia, setDia] = useState('')
  const [single, setSingle] = useState('')

  const data = vitals[tab]
  const last = data[data.length - 1]
  const meta = metricMeta[tab]

  function submit() {
    if (metric === 'bp') {
      const s = parseFloat(sys), d = parseFloat(dia)
      if (!s || !d) return
      onLog('bp', { date: TODAY_ISO, sys: s, dia: d })
      setSys(''); setDia('')
    } else {
      const v = parseFloat(single)
      if (!v) return
      onLog(metric, { date: TODAY_ISO, v })
      setSingle('')
    }
  }

  const recentRows = Object.keys(vitals)
    .flatMap((k) =>
      vitals[k].slice(-4).map((d) => ({
        date: d.date,
        label: metricMeta[k].label,
        val: k === 'bp' ? `${d.sys}/${d.dia} mmHg` : `${d.v} ${metricMeta[k].unit}`
      }))
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8)

  return (
    <section className="view active">
      <div className="topbar"><div><h2>Vitals &amp; Health Tracker</h2><p>Log readings and watch your trends over time.</p></div></div>

      <div className="card">
        <div className="tab-row">
          {TABS.map((t) => (
            <button key={t} className={'tab-btn' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>
              {metricMeta[t].label}
            </button>
          ))}
        </div>
        <div className="chart-wrap">
          <div className="chart-top">
            <div>
              <span className="big mono">{tab === 'bp' ? `${last.sys}/${last.dia}` : last.v}</span>{' '}
              <span className="unit">{meta.unit}</span>
            </div>
            <span className="muted" style={{ fontSize: 12 }}>{fmtDate(data[0].date)} – {fmtDate(last.date)}</span>
          </div>
          <VitalsChart metric={tab} data={data} />
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-head"><h3>Log a new reading</h3></div>
          <div className="field">
            <label>Metric</label>
            <select value={metric} onChange={(e) => setMetric(e.target.value)}>
              <option value="bp">Blood pressure</option>
              <option value="weight">Weight (lb)</option>
              <option value="glucose">Glucose (mg/dL)</option>
              <option value="hr">Heart rate (bpm)</option>
            </select>
          </div>

          {metric === 'bp' ? (
            <div className="form-grid">
              <div className="field"><label>Systolic</label><input type="number" value={sys} onChange={(e) => setSys(e.target.value)} placeholder="e.g. 118" /></div>
              <div className="field"><label>Diastolic</label><input type="number" value={dia} onChange={(e) => setDia(e.target.value)} placeholder="e.g. 76" /></div>
            </div>
          ) : (
            <div className="field">
              <label>{metricMeta[metric].label} ({metricMeta[metric].unit})</label>
              <input type="number" value={single} onChange={(e) => setSingle(e.target.value)} placeholder="Value" />
            </div>
          )}

          <button className="btn" onClick={submit}>Add reading</button>
        </div>

        <div className="card">
          <div className="card-head"><h3>Recent readings</h3></div>
          <div className="table-wrap">
            <table className="records">
              <thead><tr><th>Date</th><th>Metric</th><th>Value</th></tr></thead>
              <tbody>
                {recentRows.map((r, i) => (
                  <tr key={i}>
                    <td className="mono">{fmtDate(r.date)}</td>
                    <td>{r.label}</td>
                    <td className="mono">{r.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
