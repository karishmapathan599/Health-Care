import {
  DashboardIcon, CalendarIcon, RecordsIcon, RxIcon, MessageIcon, VitalsIcon, ProfileIcon
} from './Icons.jsx'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { key: 'appointments', label: 'Appointments', icon: CalendarIcon },
  { key: 'records', label: 'Medical Records', icon: RecordsIcon },
  { key: 'prescriptions', label: 'Prescriptions', icon: RxIcon },
  { key: 'messages', label: 'Messages', icon: MessageIcon, badgeKey: 'unread' },
  { key: 'vitals', label: 'Vitals', icon: VitalsIcon },
  { key: 'profile', label: 'Profile', icon: ProfileIcon }
]

export default function Sidebar({ activeView, onNavigate, patient, unread }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="mark">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="name">Harborview</div>
          <div className="sub">PATIENT PORTAL</div>
        </div>
      </div>

      <div className="patient-card">
        <div className="avatar">{patient.initials}</div>
        <div className="who">
          <div className="nm">{patient.name}</div>
          <div className="mrn">MRN {patient.mrn}</div>
        </div>
      </div>

      <nav className="topics">
        {NAV_ITEMS.map(({ key, label, icon: Icon, badgeKey }) => (
          <button
            key={key}
            className={'nav-btn' + (activeView === key ? ' active' : '')}
            onClick={() => onNavigate(key)}
          >
            <Icon />
            {label}
            {badgeKey === 'unread' && unread > 0 && <span className="badge">{unread}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        Demo data only — not a real medical record. Nothing here is stored beyond this browser.
      </div>
    </aside>
  )
}
