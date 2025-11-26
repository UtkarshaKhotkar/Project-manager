const express = require('express');
const router = express.Router();

// In-memory storage
let projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'In Progress',
    priority: 'High',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-30'),
    createdAt: new Date('2024-01-10')
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Build iOS and Android mobile application',
    status: 'Planning',
    priority: 'Medium',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-06-30'),
    createdAt: new Date('2024-01-20')
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integrate third-party payment API',
    status: 'Completed',
    priority: 'High',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-01-15'),
    createdAt: new Date('2023-11-25')
  }
];

let nextId = 4;

// GET all projects
router.get('/', (req, res) => {
  res.json(projects);
});

// GET project by ID
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// POST create project
router.post('/', (req, res) => {
  const { name, description, status, priority, startDate, endDate } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newProject = {
    id: nextId++,
    name,
    description,
    status: status || 'Planning',
    priority: priority || 'Medium',
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: endDate ? new Date(endDate) : null,
    createdAt: new Date()
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

// PUT update project
router.put('/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const { name, description, status, priority, startDate, endDate } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    name: name || projects[projectIndex].name,
    description: description || projects[projectIndex].description,
    status: status || projects[projectIndex].status,
    priority: priority || projects[projectIndex].priority,
    startDate: startDate ? new Date(startDate) : projects[projectIndex].startDate,
    endDate: endDate ? new Date(endDate) : projects[projectIndex].endDate
  };

  res.json(projects[projectIndex]);
});

// DELETE project
router.delete('/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const deletedProject = projects[projectIndex];
  projects.splice(projectIndex, 1);
  
  res.json({ message: 'Project deleted successfully', project: deletedProject });
});

module.exports = router;
