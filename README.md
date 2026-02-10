# Car Rental Management System

Project is split into two workspaces:

- `frontend/`: React + Vite application.
- `backend/`: Express + PostgreSQL + Sequelize API.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```
