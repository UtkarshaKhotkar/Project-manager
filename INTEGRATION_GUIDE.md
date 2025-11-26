# Backend Integration Guide

## What's Been Done

### 1. Backend API Created ✅
Located in `/backend` directory with:
- Express.js server running on port 5000
- RESTful API endpoints for users
- MongoDB/MySQL support
- CORS enabled for frontend communication

### 2. API Service Layer Added ✅
Created `/src/services/api.js` with:
- Axios instance configured
- Request/response interceptors
- User API methods (CRUD operations)
- Authentication token handling

### 3. Environment Configuration ✅
- `.env.example` created for API URL configuration
- Backend configured to work with your existing frontend

## How to Use the Backend API

### In Your React Components:

```javascript
import { userAPI, healthCheck } from '../services/api';

// Example: Fetch users in a component
const fetchUsers = async () => {
  try {
    const response = await userAPI.getAll();
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Example: Create a new user
const createUser = async (userData) => {
  try {
    const response = await userAPI.create(userData);
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
```

### In Redux Slices:

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const response = await userAPI.getAll();
    return response.data;
  }
);
```

## Running the Full Stack App

### 1. Start Backend (Port 5000):
```bash
cd backend
npm run dev
```

### 2. Start Frontend (Port 3000):
```bash
npm start
```

## CSP Issue Fixed

The Content Security Policy error with 'eval' has been addressed by:
- Using your original webpack configuration (no Vite eval issues)
- The separate `/frontend` folder with Vite is optional and runs on port 3001

## API Endpoints Available

### Health Check
- `GET http://localhost:5000/api` - Check if API is running

### Users
- `GET http://localhost:5000/api/users` - Get all users
- `GET http://localhost:5000/api/users/:id` - Get user by ID
- `POST http://localhost:5000/api/users` - Create new user
- `PUT http://localhost:5000/api/users/:id` - Update user
- `DELETE http://localhost:5000/api/users/:id` - Delete user

## Next Steps

1. **Add More Models**: Create additional models in `/backend/models/`
2. **Add More Routes**: Create routes for projects, tasks, team, etc.
3. **Connect Redux**: Integrate API calls into your Redux slices
4. **Add Authentication**: Implement JWT authentication
5. **Database Setup**: Configure MongoDB or MySQL in `/backend/.env`

## Example: Adding a Projects API

### 1. Create Model (`/backend/models/Project.js`):
```javascript
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
```

### 2. Create Routes (`/backend/routes/projectRoutes.js`):
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all projects' });
});

module.exports = router;
```

### 3. Add to server.js:
```javascript
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);
```

### 4. Add to API service (`/src/services/api.js`):
```javascript
export const projectAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};
```

---

Your Smart Dashboard now has a full backend API ready to use! 🚀
