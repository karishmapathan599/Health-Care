# Harborview Patient Portal

A patient portal prototype built with React + Vite: appointments, medical records, prescriptions, secure messaging, and a vitals tracker with trend charts.

All data is fictional demo data (see `src/data/seedData.js`). This is a front-end-only prototype — nothing is sent to a server, and anything you change (booking an appointment, requesting a refill, sending a message, logging a vital) is saved to your own browser's `localStorage` only.

## Clone and run

```bash
git clone https://github.com/karishmapathan599/Health-Care.git
cd Health-Care
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Scripts

| Command           | What it does                          |
|--------------------|----------------------------------------|
| `npm run dev`       | Start the dev server with hot reload   |
| `npm run build`     | Production build into `dist/`          |
| `npm run preview`   | Preview the production build locally   |

## Project structure

```
├── index.html              # Vite entry HTML
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx               # App shell, view routing, top-level state
│   ├── components/           # Shared, reusable UI pieces
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── RowItem.jsx
│   │   ├── StatusPill.jsx
│   │   ├── VitalsChart.jsx
│   │   └── Icons.jsx
│   ├── views/                # One component per portal section
│   │   ├── Dashboard.jsx
│   │   ├── Appointments.jsx
│   │   ├── MedicalRecords.jsx
│   │   ├── Prescriptions.jsx
│   │   ├── Messages.jsx
│   │   ├── Vitals.jsx
│   │   └── Profile.jsx
│   ├── data/
│   │   └── seedData.js       # Fictional demo data (patient, appointments, meds, vitals, messages)
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── format.js
│   └── styles/
│       └── index.css         # Design tokens + all component styles
├── package.json
└── vite.config.js
```

## Tech

React 18, Vite 5. No CSS framework or UI kit — plain CSS with custom properties for theming (light/dark via `prefers-color-scheme`).
