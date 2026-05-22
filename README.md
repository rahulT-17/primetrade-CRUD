# PrimeTrade.ai

![PrimeTrade Demo](demo/primetrade_demo.mp4)

A minimal, production-style task manager with JWT authentication, role-based access, and a clean React frontend. Built for clarity, learning, and fast onboarding.

## Features
- Register, login, and manage your own tasks
- Admins can view and manage all users and tasks
- JWT-based authentication (secure, stateless)
- Minimal, modern UI with a warm, readable palette
- FastAPI backend, PostgreSQL database, Alembic migrations
- React + Vite frontend, Axios API client

## Tech Stack

## Key Design

- **Separation of Concerns:** Backend (API, auth, DB) and frontend (UI, state, API calls) are fully decoupled for clarity and maintainability.
- **App Factory Pattern:** FastAPI backend uses an app factory for modularity and easy scaling.
- **Async Database:** SQLAlchemy async engine for non-blocking DB access and performance.
- **JWT Auth & Role-Based Access:** Secure, stateless authentication with user/admin roles enforced at API and UI levels.
- **Strict Validation:** Pydantic schemas validate all input/output; password byte limit enforced for bcrypt.
- **Minimal, Unique UI:** Custom CSS with a warm, readable palette inspired by Claude; Google Fonts for a modern look.
- **Error Handling:** All errors surfaced clearly in the UI and API responses for fast debugging.
- **Production-Ready Patterns:** CORS, .env config, Alembic migrations, and type-only imports for best practices.


## Setup
### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL

### Backend
1. Clone the repo and `cd` into the project
2. Copy `.env.example` to `.env` in `backend/` and fill in your DB credentials
3. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   alembic upgrade head
   ```
5. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend
1. Copy `.env.example` to `.env` in `frontend/` and set your backend URL (default: `http://localhost:8000/api/v1`)
2. Install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Usage
- Visit [http://localhost:5173](http://localhost:5173) to use the app
- Register a new user, log in, and manage your tasks
- Admin users can view all users and tasks (see backend for admin creation)

## API Docs
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

## Notes
- `.env` is in `.gitignore`; commit `.env.example` only
- No hardcoded secrets in code
- Clean, readable commit history

---
*Built for internship submission for primetrade.ai*
