import { useState } from 'react'
import RowItem from '../components/RowItem.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { CalendarIcon } from '../components/Icons.jsx'
import { fmtDate } from '../utils/format.js'

const DEPTS = ['Primary Care', 'Cardiology', 'Dermatology', 'Orthopedics', 'Behavioral Health']
const DOCS = ['Any available provider', 'Dr. Patel', 'Dr. Nakamura', 'Dr. Obi']
const TIMES = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']

export default function Appointments({ appts, onBook, onCancel }) {
  const [form, setForm] = useState({
    dept: DEPTS[0], doc: DOCS[0], date: '', time: TIMES[0], type: 'In-person', reason: ''
  })

  const upcoming = appts
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = appts
    .filter((a) => a.status === 'completed' || a.status === 'cancelled')
    .sort((a, b) => b.date.localeCompare(a.date))

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function submit() {
    if (!form.date) return
    onBook({
      id: 'a' + Date.now(),
      doc: form.doc,
      dept: form.dept,
      date: form.date,
      time: form.time,
      type: form.type === 'Telehealth' ? 'Telehealth' : `In-person · ${form.dept}`,
      status: 'pending'
    })
    setForm((f) => ({ ...f, date: '', reason: '' }))
  }

  function row(a, withActions) {
    return (
      <RowItem
        key={a.id}
        icon={<CalendarIcon />}
        title={`${a.doc} · ${a.dept}`}
        subtitle={a.type}
        meta={
          <>
            <span className="when">{fmtDate(a.date)} · {a.time}</span>
            <StatusPill status={a.status} />
            {withActions && a.status !== 'cancelled' && (
              <button className="btn ghost sm" style={{ marginTop: 2 }} onClick={() => onCancel(a.id)}>Cancel</button>
            )}
          </>
        }
      />
    )
  }

  return (
    <section className="view active">
      <div className="topbar"><div><h2>Appointments</h2><p>Manage upcoming visits or book a new one.</p></div></div>

      <div className="card">
        <div className="card-head"><h3>Upcoming</h3></div>
        {upcoming.length ? upcoming.map((a) => row(a, true)) : <p className="muted" style={{ fontSize: 13 }}>No upcoming appointments.</p>}
      </div>

      <div className="card">
        <div className="card-head"><h3>Book a new appointment</h3></div>
        <div className="form-grid">
          <div className="field">
            <label>Department</label>
            <select value={form.dept} onChange={(e) => update('dept', e.target.value)}>
              {DEPTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Provider</label>
            <select value={form.doc} onChange={(e) => update('doc', e.target.value)}>
              {DOCS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Date</label>
            <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
          </div>
          <div className="field">
            <label>Time</label>
            <select value={form.time} onChange={(e) => update('time', e.target.value)}>
              {TIMES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field full">
            <label>Visit type</label>
            <select value={form.type} onChange={(e) => update('type', e.target.value)}>
              <option>In-person</option>
              <option>Telehealth</option>
            </select>
          </div>
          <div className="field full">
            <label>Reason for visit</label>
            <textarea
              value={form.reason}
              onChange={(e) => update('reason', e.target.value)}
              placeholder="Briefly describe what you'd like to discuss"
            />
          </div>
        </div>
        <button className="btn" onClick={submit}>Request appointment</button>
        <span className="muted" style={{ fontSize: 12, marginLeft: 10 }}>Requests are confirmed by the office within 1 business day.</span>
      </div>

      <div className="card">
        <div className="card-head"><h3>Past visits</h3></div>
        {past.map((a) => row(a, false))}
      </div>
    </section>
  )
}
