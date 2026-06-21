# Yoga Studio Management MVP

A lightweight system for managing yoga studio operations including courses, students, enrollments, and attendance tracking.

This project is designed as a real-world SaaS-style MVP for a small yoga studio to replace manual tracking (Excel / paper / messaging apps).

Live deployment: https://yoga-flow-m4rv.vercel.app/

---

## 🎯 Problem

Yoga studios often manage:

- Student attendance manually
- Remaining session tracking in Excel or notebooks
- Class participation via WhatsApp or paper lists

This leads to:

- Human errors
- Time-consuming administration
- Lack of visibility on student progress

---

## 🚀 Solution

A simple system that digitizes:

- Course management
- Student management
- Enrollment (10-session model)
- Attendance tracking
- Automatic remaining session calculation

---

## 🧩 MVP Features

- Create and manage courses
- Add and manage students
- Enroll students into courses
- Daily attendance tracking
- Mark presence / absence
- Save or deduct sessions based on attendance rules
- View student progress (remaining sessions)

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui-style local UI components
- dependency-cruiser for architecture checks
- Prisma ORM
- PostgreSQL (or SQLite for development)

---

## 🚢 Deployment

Production deployment is handled by Vercel:

- Live URL: https://yoga-flow-m4rv.vercel.app/
- Vercel framework: Next.js
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`

GitHub Actions is used as the CI quality gate before merge/deploy. It runs linting, architecture checks, the Next.js build, and a Docker image build.

---

## 🐳 Docker

The project includes a production Docker image for local production-like runs and future self-hosting.

Docker Desktop or another Docker engine is required to run these commands.

Build the image:

```bash
pnpm docker:build
```

Run with Docker Compose:

```bash
pnpm docker:run
```

The app runs on:

```bash
http://localhost:3000
```

The Docker image uses Next.js standalone output. Vercel remains the primary deployment path.

---

## ✅ Quality Checks

Run the same checks used in CI:

```bash
pnpm lint
pnpm arch:check
pnpm build
```

Generate a local dependency graph:

```bash
pnpm arch:graph
```

The generated `dependency-graph.dot` file is ignored by git.

---

## 📁 Project Structure

See `/docs` for full architecture and product documentation.

---

## 📌 Status

This is an MVP version focused on validating real studio workflows before scaling into a full SaaS product.

---

## 📖 Documentation

All product and system design documents are available in the `/docs` folder:

- PRD
- ADRs
- Database design
- Business rules
- Roadmap

---

## 🔮 Future Ideas

- Payment system
- SMS / WhatsApp reminders
- Multi-studio SaaS support
- Coach dashboard
- Analytics
