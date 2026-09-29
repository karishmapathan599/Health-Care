# Harborview Patient Portal

A single-page patient portal prototype: appointments, medical records, prescriptions, secure messaging, and a vitals tracker with trend charts.

All data is fictional demo data. This is a front-end prototype only — nothing is sent to a server, and anything you change (booking an appointment, requesting a refill, sending a message, logging a vital) is saved to your own browser's `localStorage` only.

## Run it

No build step and no dependencies. Pick one:

**Option A — just open it**

Double-click `index.html`, or open it directly in a browser:

```bash
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

**Option B — serve it locally** (recommended if your browser blocks local-file scripts)

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit the printed local URL (e.g. `http://localhost:8000`).

## Clone

```bash
git clone <this-repo-url>
cd karishma-pathan
```

## Tech

Plain HTML/CSS/JS — no framework, no package manager, no build tooling.
