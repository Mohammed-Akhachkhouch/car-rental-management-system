# Backend - Car Rental API

This backend is built with:

- Node.js + Express
- PostgreSQL
- Sequelize ORM + Sequelize CLI
- JWT authentication

## Project structure

```text
backend/
  src/
    config/
    controllers/
    db/
      config/
      migrations/
      models/
      seeders/
    middleware/
    routes/
    utils/
```

## Local setup

1. Create `.env` from `.env.example`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

4. Start server:

```bash
npm run dev
```

API base URL:

```text
http://localhost:5000/api/v1
```

Health endpoint:

```text
GET /api/v1/health
```

## Recommended branch workflow

- `main`: protected stable branch.
- `feature/backend-foundation`: backend scaffolding and DB setup.
- `feature/backend-auth`: auth endpoints and middleware.
- `feature/backend-reservations`: reservation lifecycle.
- `feature/backend-fleet`: car/fleet management API.

Merge each feature branch through pull request with focused commits.
