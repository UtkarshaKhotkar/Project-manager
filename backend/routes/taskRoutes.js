const express = require('express');
const router = express.Router();

// In-memory storage
let tasks = [
  {
    id: 1,
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and mockups for new homepage',
    status: 'Completed',
    priority: 'High',
    assignedTo: 'John Doe',
    projectId: 1,
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-10')
  },
  {
    id: 2,
    title: 'Implement User Authentication',
    description: 'Add login and registration functionality',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Jane Smith',
    projectId: 1,
    dueDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-15')
  },
  {
    id: 3,
    title: 'Write API Documentation',
    description: 'Document all API endpoints with examples',
    status: 'Todo',
    priority: 'Medium',
    assignedTo: 'John Doe',
    projectId: 2,
    dueDate: new Date('2024-03-01'),
    createdAt: new Date('2024-01-20')
  },
  {
    id: 4,
    title: 'Setup CI/CD Pipeline',
    description: 'Configure automated testing and deployment',
    status: 'Todo',
    priority: 'Low',
    assignedTo: 'Jane Smith',
    projectId: 2,
    dueDate: new Date('2024-03-15'),
    createdAt: new Date('2024-01-22')
  }
];

let nextId = 5;

// GET all tasks
router.get('/', (req, res) => {
  const { projectId, status, assignedTo } = req.query;
  let filteredTasks = tasks;

  if (projectId) {
    filteredTasks = filteredTasks.filter(t => t.projectId === parseInt(projectId));
  }
  if (status) {
    filteredTasks = filteredTasks.filter(t => t.status === status);
  }
  if (assignedTo) {
    filteredTasks = filteredTasks.filter(t => t.assignedTo === assignedTo);
  }

  res.json(filteredTasks);
});

// GET task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST create task
router.post('/', (req, res) => {
  const { title, description, status, priority, assignedTo, projectId, dueDate } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    status: status || 'Todo',
    priority: priority || 'Medium',
    assignedTo: assignedTo || null,
    projectId: projectId || null,
    dueDate: dueDate ? new Date(dueDate) : null,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, priority, assignedTo, projectId, dueDate } = req.body;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    priority: priority || tasks[taskIndex].priority,
    assignedTo: assignedTo !== undefined ? assignedTo : tasks[taskIndex].assignedTo,
    projectId: projectId !== undefined ? projectId : tasks[taskIndex].projectId,
    dueDate: dueDate ? new Date(dueDate) : tasks[taskIndex].dueDate
  };

  res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  
  res.json({ message: 'Task deleted successfully', task: deletedTask });
});

module.exports = router;
