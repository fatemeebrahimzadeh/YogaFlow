# Product Requirements Document (PRD)

## Project: Yoga Studio Management MVP

---

## 🧭 Overview

This project is a lightweight internal system designed for yoga studio owners to manage students, courses, attendance, and session tracking.

It replaces manual tools like Excel, paper logs, and messaging apps.

---

## 🎯 Goals

- Digitize student management
- Track course enrollment
- Manage attendance efficiently
- Automatically calculate remaining sessions
- Reduce manual administrative work

---

## 👥 Users

### Admin (Primary User)

Studio owner or receptionist responsible for daily operations.

---

## 🚫 Out of Scope (MVP)

- Online payments
- Notifications (SMS / WhatsApp)
- Multi-studio SaaS
- Mobile application
- Advanced subscription billing
- Waitlist system

---

## 🧱 Core Concept

This system is based on an **Enrollment-based model**:

- A student enrolls in a course
- Purchases a fixed number of sessions (e.g. 10)
- Attends weekly sessions
- System tracks attendance and remaining sessions automatically

---

## 🧩 Features

---

## 1. Course Management

### Description
Manage yoga courses (fixed weekly classes)

### Data
- Title
- Days of week
- Time

### Actions
- Create course
- Edit course
- View courses

---

## 2. Student Management

### Description
Manage students in the system

### Data
- Name
- Phone

### Actions
- Add student
- Edit student
- View students

---

## 3. Enrollment (Core Feature)

### Description
Assign students to courses with a fixed session package

### Data
- Student
- Course
- Total sessions (e.g. 10)
- Remaining sessions

### Rules
- On creation: remainingSessions = totalSessions
- Attendance affects remaining sessions

---

## 4. Attendance Tracking

### Description
Track student presence for each session

### Data
- Session
- Student
- Status (Present / Absent)
- Reason (optional)
- Session saved (boolean)

### Rules

If Present:
- No session deduction

If Absent:
- If sessionSaved = false → deduct 1 session
- If sessionSaved = true → do not deduct

---

## 5. Session Management

### Description
Each course session that happens on a specific date

### Data
- Course
- Date

---

## 6. Student Progress

### Description
View student status in a course

### Metrics
- Total sessions
- Used sessions
- Remaining sessions
- Attendance history

---

## 🔄 System Flow

Student → Enrollment → Sessions → Attendance → Remaining Sessions Update

---

## 🧠 Key Business Rules

- Students must be enrolled before attending sessions
- Attendance drives session deduction logic
- System does not support free booking (MVP scope)
- Session saving depends on admin decision

---

## 📌 Success Criteria

MVP is successful if:

- Admin can manage classes without Excel
- Attendance can be recorded in under 1 minute per session
- Remaining sessions are always accurate
- System is usable in a real studio workflow

---

## 🔮 Future Enhancements

- Payment integration
- Notifications (WhatsApp/SMS)
- Multi-studio SaaS support
- Coach dashboard
- Analytics and reporting