const LABELS = {
  confirmed: ['ok', 'Confirmed'],
  pending: ['pending', 'Pending'],
  cancelled: ['danger', 'Cancelled'],
  completed: ['done', 'Completed'],
  ready: ['ok', 'Ready'],
  requested: ['pending', 'Refill requested']
}

export default function StatusPill({ status }) {
  const [cls, label] = LABELS[status] || ['done', status]
  return <span className={`pill ${cls}`}>{label}</span>
}
