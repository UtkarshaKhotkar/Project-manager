# Backend API

Node.js/Express backend for the full stack application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Tech Stack

- Node.js
- Express.js
- MongoDB/Mongoose
- CORS
- dotenv
