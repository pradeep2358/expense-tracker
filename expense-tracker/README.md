# Personal Expense Tracker (MERN)

## Requirements
Node.js and MongoDB (running locally) installed.

## Run Backend
cd backend
npm install
npm start        # runs on http://localhost:5000

## Run Frontend (new terminal)
cd frontend
npm install
npm run dev      # runs on http://localhost:5173

## API Endpoints
POST /api/auth/register, POST /api/auth/login
POST/GET /api/expenses, GET/PUT/DELETE /api/expenses/:id  (JWT required: Authorization: Bearer <token>)
