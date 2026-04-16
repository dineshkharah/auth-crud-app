# Auth CRUD App (MERN)

A full-stack MERN application with JWT authentication and task management CRUD functionality.

---

## 🚀 Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt

---

## 🔐 Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes

### Task Management

- Create task
- Get user-specific tasks
- Update task (status, title, description)
- Delete task
- Ownership-based access control

### UI

- Dark theme (Tailwind)
- Dashboard with task list
- Modal-based task editing
- Smooth animations & improved UX

---

## API Endpoints

### Auth

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/me

### Tasks

- GET /api/v1/task
- POST /api/v1/task
- PUT /api/v1/task/:id
- DELETE /api/v1/task/:id

---

## ⚙️ Setup Instructions

### 1. Clone repo

```bash
git clone https://github.com/dineshkharah/auth-crud-app.git
cd auth-crud-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

_Create .env:_

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

_Run:_

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend/auth-crud
npm install
npm start
```

---

## 🔒 Security Practices

- Password hashing using bcrypt
- JWT authentication with expiration
- Protected routes using middleware
- Input validation (basic)

## 📈 Scalability Notes

- Can be split into microservices (auth + tasks)
- Add Redis for caching frequently accessed data
- Use load balancer (NGINX) for scaling
- Dockerize for containerized deployment
- Add logging & monitoring (Winston, Prometheus)

## 📁 Postman Collection

Included in repo for testing APIs.

## Author

- Dinesh Kharah

---
