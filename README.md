# MedLink — Automatic Health Monitoring & Report Management System

A centralized patient health record platform that gives every patient a single retrievable Health ID, accessible from any clinic in the network. Doctors see a patient's complete diagnostic history before ordering tests — eliminating redundant checkups and broken continuity of care.

---

## The Problem

When a patient visits multiple clinics, each clinic treats them as a new patient:

- Paper records get lost between visits
- Doctors re-order tests already done elsewhere
- Clinics have no shared infrastructure
- Rural patients with poor connectivity fall through the gaps entirely

MedLink solves this with a 4-layer architecture connecting data sources, a cloud database, and delivery endpoints behind one patient-owned ID.

---

## Architecture — 4 Layers

```
[Data Sources] → [Acquisition & Gateway] → [Cloud & Processing] → [Access & Delivery]
```

### Layer 1 — Data Sources
Every touchpoint that generates health data:
- Wearable sensors (pulse, BP, temperature, glucose) via ESP32/Arduino
- Hospital diagnostic devices (ECG, X-ray, blood analyzers)
- Paper prescriptions and lab slips (digitized via OCR)
- Mobile app for manual patient entry

### Layer 2 — Acquisition & Gateway
Normalizes and tags all incoming data:
- IoT gateway collects sensor readings over Bluetooth/Wi-Fi and pushes via MQTT
- OCR engine (Tesseract / Google Vision API) converts paper reports to structured text
- Every record is tagged with: `patient_health_id`, `timestamp`, `source_clinic`

### Layer 3 — Cloud & Processing
The core of the system:
- Unique Health ID per patient — linkable to Aadhaar or a national health ID
- Central EHR database (PostgreSQL + S3/MinIO), AES-256 encrypted at rest
- Analytics engine detects trends (e.g. rising BP across 3 visits), flags anomalies, and surfaces recent equivalent results to prevent duplicate test orders

### Layer 4 — Access & Delivery
Where clinicians and patients interact with the data:
- **Doctor portal** — full history before ordering a single test
- **Patient app** — view, download, and share records anytime
- **SMS / offline sync** — last report summary via SMS for rural users; data syncs on reconnect

---

## Tech Stack

| Component | Technology |
|---|---|
| Mobile App | Flutter / React Native |
| Backend API | Node.js · Django REST |
| Database | PostgreSQL (records) + S3/MinIO (files) |
| OCR | Tesseract · Google Vision API |
| IoT | ESP32/Arduino + MQTT broker |
| Analytics | Python · pandas · scikit-learn |
| Security | JWT · AES-256 encryption · RBAC |

---

## Security Model

- JWT-based stateless authentication
- AES-256 encryption at rest
- Role-based access control (RBAC) — patients, doctors, admins have distinct permissions
- Patient consent required before any record is shared across clinics
- Immutable audit log on every record access

---

## Rural & Offline Support

- SMS fallback delivers the last report summary to any mobile number
- Offline-first mobile app caches records locally
- Progressive sync — data queued locally and uploaded when connectivity returns
- ESP32 sensors buffer readings on-device until gateway is reachable

---

## Project Structure (Frontend)

```
├── index.html              # Vite HTML shell
├── src/
│   ├── main.tsx            # React entrypoint
│   ├── App.tsx             # Full website — all sections
│   └── index.css           # Tailwind v4 + Google Fonts imports
├── vite.config.ts          # Vite + Tailwind + React config
└── package.json
```

---

## Website Sections

The landing page (`src/App.tsx`) is organized into:

1. **Nav** — fixed, scroll-aware, smooth navigation
2. **Hero** — Health ID concept, key stats, doctor photo
3. **Problem** — Why the current system fails
4. **How It Works** — Interactive 4-layer architecture diagram
5. **Features** — Duplicate prevention, OCR, trend detection, offline access
6. **Tech Stack** — Component table with security and rural callout panels
7. **Join the Network** — Clinic registration form
8. **Footer** — Links, network status indicators

---

## Running Locally

```bash
pnpm install
pnpm dev
```

The development server starts on the port defined by the `$PORT` environment variable (default `8443`). Hot reload is enabled — changes reflect immediately.

---

## Key Concepts

**Health ID** — A unique patient identifier (e.g. `NHI-2024-4872991`) that links all records across clinics. Can be tied to Aadhaar or a generated national health ID. One ID per patient, for life.

**Duplicate test detection** — Before a doctor orders a test, the analytics engine checks if an equivalent result already exists within a configurable recency window and flags it.

**Trend flagging** — The analytics engine tracks values across visits. A single high blood pressure reading is noted; three consecutive rising readings trigger an alert to the attending doctor.

---

## Why This Matters

The repeated-checkup waste happens because reports aren't portable. A patient sees Doctor A, then Doctor B has no visibility into A's tests and re-orders them. Centralizing records behind one retrievable ID — with a low-bandwidth access path for rural users — directly removes that redundancy and improves outcomes for patients who move between providers.

**Live link:** -https://medlink-steel.vercel.app/
