import StatCard from '../components/StatCard.jsx'
import RowItem from '../components/RowItem.jsx'
import { CalendarIcon, CheckIcon, RxIcon, MessageIcon } from '../components/Icons.jsx'
import { fmtDate } from '../utils/format.js'

export default function Dashboard({ store, onNavigate, todayLabel }) {
  const upcoming = store.appts
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date))

  const next = upcoming[0]
  const activeMeds = store.meds.filter((m) => m.status !== 'discontinued')
  const dueSoon = activeMeds.filter((m) => m.refills <= 1).length
  const lastBp = store.vitals.bp[store.vitals.bp.length - 1]

  return (
    <section className="view active">
      <div className="topbar">
        <div>
          <h2>Good to see you, Alex</h2>
          <p>{todayLabel}</p>
        </div>
        <button className="btn" onClick={() => onNavigate('appointments')}>+ Book appointment</button>
      </div>

      <div className="grid4">
        <StatCard
          label="Next appointment"
          value={next ? `${fmtDate(next.date).replace(/, \d{4}$/, '')}, ${next.time}` : 'None scheduled'}
          sub={next ? `${next.doc} · ${next.dept}` : ''}
        />
        <StatCard label="Active prescriptions" value={activeMeds.length} sub={dueSoon ? `${dueSoon} refill due soon` : 'All refills current'} />
        <StatCard label="Unread messages" value={store.unread} sub="From your care team" />
        <StatCard
          label="Latest blood pressure"
          value={lastBp ? `${lastBp.sys}/${lastBp.dia}` : '—'}
          sub={lastBp ? `Logged ${fmtDate(lastBp.date)}` : ''}
        />
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-head"><h3>Upcoming appointments</h3><span className="muted">{upcoming.length} scheduled</span></div>
          {upcoming.length ? (
            upcoming.slice(0, 3).map((a) => (
              <RowItem
                key={a.id}
                icon={<CalendarIcon />}
                title={`${a.doc} · ${a.dept}`}
                subtitle={a.type}
                meta={<span className="when">{fmtDate(a.date)} · {a.time}</span>}
              />
            ))
          ) : (
            <p className="muted" style={{ fontSize: 13 }}>No upcoming appointments.</p>
          )}
        </div>

        <div className="card">
          <div className="card-head"><h3>Recent activity</h3></div>
          <RowItem icon={<CheckIcon />} title="Lab results ready" subtitle="Lipid Panel · Aug 18" />
          <RowItem icon={<RxIcon />} title="Atorvastatin refilled" subtitle="1 refill remaining" />
          <RowItem icon={<MessageIcon />} title="New message from Dr. Patel's office" subtitle="Sep 26" />
        </div>
      </div>
    </section>
  )
}
