export const TODAY_ISO = '2026-09-29'

export const patient = {
  name: 'Alex Rivera',
  initials: 'AR',
  mrn: '20481-77',
  dob: '04/12/1990',
  phone: '(555) 219-4482',
  email: 'alex.rivera@example.com',
  address: '412 Elm Street, Riverside, CA',
  insurance: {
    plan: 'Harborview Health PPO',
    memberId: 'HHP-88213904',
    groupNumber: 'GRP-4471'
  },
  emergencyContact: {
    name: 'Jordan Rivera (spouse)',
    phone: '(555) 219-7731'
  }
}

export const seedAppointments = [
  { id: 'a1', doc: 'Dr. Patel', dept: 'Cardiology', date: '2026-10-06', time: '10:30 AM', type: 'Telehealth', status: 'confirmed' },
  { id: 'a2', doc: 'Dr. Nakamura', dept: 'Dermatology', date: '2026-10-14', time: '2:00 PM', type: 'In-person · Suite 210', status: 'confirmed' },
  { id: 'a3', doc: 'Dr. Patel', dept: 'Cardiology', date: '2026-08-18', time: '10:00 AM', type: 'In-person', status: 'completed' },
  { id: 'a4', doc: 'Dr. Obi', dept: 'Primary Care', date: '2026-07-02', time: '9:00 AM', type: 'In-person', status: 'completed' }
]

export const seedMedications = [
  { id: 'm1', name: 'Lisinopril 10mg', freq: 'Once daily, morning', doc: 'Dr. Patel', refills: 2, status: 'active' },
  { id: 'm2', name: 'Atorvastatin 20mg', freq: 'Once daily, evening', doc: 'Dr. Patel', refills: 1, status: 'active' },
  { id: 'm3', name: 'Albuterol Inhaler', freq: 'As needed', doc: 'Dr. Obi', refills: 3, status: 'active' }
]

export const pastMedications = [
  { id: 'pm1', name: 'Amoxicillin 500mg', freq: '3x daily · prescribed by Dr. Obi · completed course' }
]

export const visitHistory = [
  { date: '2026-08-18', provider: 'Dr. Patel · Cardiology', reason: 'Follow-up, blood pressure check', summary: 'BP well-controlled on current dose. Continue Lisinopril 10mg.' },
  { date: '2026-07-02', provider: 'Dr. Obi · Primary Care', reason: 'Annual physical', summary: 'Overall stable. Ordered lipid panel and metabolic panel.' },
  { date: '2026-03-11', provider: 'Dr. Obi · Primary Care', reason: 'Seasonal allergies', summary: 'Prescribed short course of antihistamines.' },
  { date: '2026-01-22', provider: 'Dr. Nakamura · Dermatology', reason: 'Skin check', summary: 'No concerning findings. Routine follow-up in 12 months.' }
]

export const seedDocuments = [
  { name: 'Lipid Panel', date: '2026-08-18', status: 'ready' },
  { name: 'ECG Summary', date: '2026-08-18', status: 'ready' },
  { name: 'Basic Metabolic Panel', date: '2026-07-02', status: 'ready' },
  { name: 'Allergy Skin Test', date: '2026-10-14', status: 'pending' }
]

export const seedVitals = {
  bp: [
    { date: '2026-08-01', sys: 124, dia: 80 }, { date: '2026-08-08', sys: 121, dia: 79 },
    { date: '2026-08-15', sys: 122, dia: 78 }, { date: '2026-08-22', sys: 119, dia: 77 },
    { date: '2026-09-05', sys: 120, dia: 78 }, { date: '2026-09-12', sys: 117, dia: 75 },
    { date: '2026-09-19', sys: 119, dia: 76 }, { date: '2026-09-24', sys: 118, dia: 76 }
  ],
  weight: [
    { date: '2026-08-01', v: 171 }, { date: '2026-08-08', v: 170 }, { date: '2026-08-15', v: 170 },
    { date: '2026-08-22', v: 169 }, { date: '2026-09-05', v: 168 }, { date: '2026-09-12', v: 168 },
    { date: '2026-09-19', v: 167 }, { date: '2026-09-24', v: 166.5 }
  ],
  glucose: [
    { date: '2026-08-01', v: 96 }, { date: '2026-08-08', v: 101 }, { date: '2026-08-15', v: 94 },
    { date: '2026-08-22', v: 98 }, { date: '2026-09-05', v: 92 }, { date: '2026-09-12', v: 97 },
    { date: '2026-09-19', v: 95 }, { date: '2026-09-24', v: 93 }
  ],
  hr: [
    { date: '2026-08-01', v: 74 }, { date: '2026-08-08', v: 72 }, { date: '2026-08-15', v: 75 },
    { date: '2026-08-22', v: 71 }, { date: '2026-09-05', v: 70 }, { date: '2026-09-12', v: 73 },
    { date: '2026-09-19', v: 69 }, { date: '2026-09-24', v: 71 }
  ]
}

export const metricMeta = {
  bp: { unit: 'mmHg', label: 'Blood pressure' },
  weight: { unit: 'lb', label: 'Weight' },
  glucose: { unit: 'mg/dL', label: 'Glucose' },
  hr: { unit: 'bpm', label: 'Heart rate' }
}

export const seedMessages = [
  { from: 'them', text: "Hi Alex, this is a reminder that your cardiology follow-up is confirmed for October 6th at 10:30 AM (telehealth).", time: 'Sep 20, 3:12 PM' },
  { from: 'me', text: 'Thanks — will this visit cover my recent blood pressure readings too?', time: 'Sep 21, 9:04 AM' },
  { from: 'them', text: "Yes, Dr. Patel will review your last 8 weeks of readings during the visit. Feel free to log any new ones before then.", time: 'Sep 26, 11:47 AM' }
]

export const seedStore = {
  appts: seedAppointments,
  meds: seedMedications,
  vitals: seedVitals,
  msgs: seedMessages,
  unread: 1
}
