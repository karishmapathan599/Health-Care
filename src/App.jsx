import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './views/Dashboard.jsx'
import Appointments from './views/Appointments.jsx'
import MedicalRecords from './views/MedicalRecords.jsx'
import Prescriptions from './views/Prescriptions.jsx'
import Messages from './views/Messages.jsx'
import Vitals from './views/Vitals.jsx'
import Profile from './views/Profile.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { patient, seedStore } from './data/seedData.js'

const TODAY = new Date('2026-09-29T12:00:00')
const TODAY_LABEL = TODAY.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

export default function App() {
  const [view, setView] = useState('dashboard')
  const [store, setStore] = useLocalStorage('harborviewDemo_v1', seedStore)

  function navigate(next) {
    setView(next)
    if (next === 'messages' && store.unread > 0) {
      setStore((s) => ({ ...s, unread: 0 }))
    }
  }

  function bookAppointment(appt) {
    setStore((s) => ({ ...s, appts: [...s.appts, appt] }))
  }

  function cancelAppointment(id) {
    setStore((s) => ({
      ...s,
      appts: s.appts.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    }))
  }

  function requestRefill(id) {
    setStore((s) => ({
      ...s,
      meds: s.meds.map((m) => (m.id === id ? { ...m, status: 'requested' } : m))
    }))
  }

  function sendMessage(textValue) {
    const now = new Date()
    const time =
      now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
      ', ' +
      now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

    setStore((s) => ({ ...s, msgs: [...s.msgs, { from: 'me', text: textValue, time }] }))

    setTimeout(() => {
      setStore((s) => ({
        ...s,
        msgs: [...s.msgs, { from: 'system', text: 'Message sent. Your care team typically responds within 1 business day.' }]
      }))
    }, 500)
  }

  function logVital(metricKey, entry) {
    setStore((s) => ({
      ...s,
      vitals: { ...s.vitals, [metricKey]: [...s.vitals[metricKey], entry] }
    }))
  }

  return (
    <div className="shell">
      <Sidebar activeView={view} onNavigate={navigate} patient={patient} unread={store.unread} />

      <main>
        {view === 'dashboard' && <Dashboard store={store} onNavigate={navigate} todayLabel={TODAY_LABEL} />}
        {view === 'appointments' && (
          <Appointments appts={store.appts} onBook={bookAppointment} onCancel={cancelAppointment} />
        )}
        {view === 'records' && <MedicalRecords />}
        {view === 'prescriptions' && <Prescriptions meds={store.meds} onRequestRefill={requestRefill} />}
        {view === 'messages' && <Messages msgs={store.msgs} onSend={sendMessage} />}
        {view === 'vitals' && <Vitals vitals={store.vitals} onLog={logVital} />}
        {view === 'profile' && <Profile />}
      </main>
    </div>
  )
}
