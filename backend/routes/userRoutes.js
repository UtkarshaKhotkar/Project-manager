const express = require('express');
const router = express.Router();

// In-memory storage (replace with database later)
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date('2024-02-20')
  }
];

let nextId = 3;

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create user
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    createdAt: new Date()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  
  // Check if email is taken by another user
  if (email) {
    const existingUser = users.find(u => u.email === email && u.id !== userId);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };

  res.json(users[userIndex]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

module.exports = router;
