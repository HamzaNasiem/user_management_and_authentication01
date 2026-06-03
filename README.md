# User Management & Authentication System

A premium, production-grade User Management and Authentication System built with a **FastAPI** backend and a **Next.js** frontend. It features secure JWT-based sessions, stateful token invalidation on logout, OTP verification, and role-based access control.

---

## Technical Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Production) / SQLite (Local Development)
- **ORM**: SQLModel / SQLAlchemy
- **Authentication**: JWT, bcrypt, stateful `AuthToken` tracking
- **Messaging**: Mocked Email (SMTP) & SMS (WhatsApp API) gateways for easy local development

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: TailwindCSS & Lucide Icons
- **Middleware**: Edge Runtime-compatible route protection

---

## Features
- **Instant Local Registration & Login**: Users registered in local SQLite mode are automatically verified.
- **Role-Based Access**: Dedicated routes and views for Students, Teachers, and Admins.
- **Stateful JWT Blacklist**: Logging out invalidates active tokens in the database, preventing session replay.
- **Secure Credentials**: Direct `bcrypt` password hashing (passlib-free) for Python 3.12 compatibility.
- **Premium Glassmorphic UI**: Beautiful dark-themed landing pages and dashboard control centers.

---

## Local Development Guide

### 1. Prerequisites
- **Python**: version `3.11` or `3.12`
- **Node.js**: version `18` or `20`
- **Poetry**: Python dependency manager

---

### 2. Backend Setup

1. Navigate to the `back-end/user-service` folder:
   ```bash
   cd back-end/user-service
   ```
2. Install python dependencies:
   ```bash
   poetry install
   ```
3. Copy environment variables (a pre-configured `.env` is supplied in the workspace for SQLite fallback):
   ```bash
   # Make sure `.env` exists in back-end/user-service/
   ```
4. Run the backend development server:
   ```bash
   poetry run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   - **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Alternative ReDoc UI**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### 3. Frontend Setup

1. Navigate to the `front-end` folder:
   ```bash
   cd ../../front-end
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Verify your `.env.local` contains:
   ```env
   BACKEND_AUTH_SERVER_URL="http://localhost:8000"
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
   - **Landing Page**: [http://localhost:3000](http://localhost:3000)
   - **Login**: [http://localhost:3000/login](http://localhost:3000/login)
   - **Admin Control Center**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Running Verification & Tests

### Backend Unit Tests
Run the pytest suite to check registration, unverified login blocks, verification tokens, and session blacklists:
```bash
cd back-end/user-service
poetry run pytest
```

### Frontend TypeScript/Lint Compilation
Verify the frontend compiles without type errors:
```bash
cd front-end
npm run build
```

---

## Running with Docker (Alternative)
To containerize the service using Docker Compose:
```bash
docker-compose up -d --build
```