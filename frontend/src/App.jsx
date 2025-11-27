import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"></span>
          Full Stack App
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Dashboard</Link></li>
          <li><Link to="/projects" className="nav-link">Projects</Link></li>
          <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
          <li><Link to="/users" className="nav-link">Users</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({ 
    users: 0, 
    projects: 0, 
    tasks: 0, 
    status: 'Loading...' 
  });

  useEffect(() => {
    // Check API status
    axios.get(API_URL)
      .then(response => {
        setStats(prev => ({ ...prev, status: response.data.message }));
      })
      .catch(error => {
        setStats(prev => ({ ...prev, status: 'API Error' }));
      });

    // Get users count
    axios.get(`${API_URL}/users`)
      .then(response => {
        setStats(prev => ({ ...prev, users: response.data.length }));
      })
      .catch(error => console.error('Error:', error));

    // Get projects count
    axios.get(`${API_URL}/projects`)
      .then(response => {
        setStats(prev => ({ ...prev, projects: response.data.length }));
      })
      .catch(error => console.error('Error:', error));

    // Get tasks count
    axios.get(`${API_URL}/tasks`)
      .then(response => {
        setStats(prev => ({ ...prev, tasks: response.data.length }));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <main className="container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.users}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>API Status</h3>
              <p className="stat-status">{stats.status}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Projects</h3>
              <p className="stat-number">{stats.projects}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Tasks</h3>
              <p className="stat-number">{stats.tasks}</p>
            </div>
          </div>
        </div>
        <div className="welcome-section">
          <h2>Welcome to Your Full Stack Application</h2>
          <p>This application demonstrates a complete full stack setup with React frontend and Node.js/Express backend.</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h3>Fast & Modern</h3>
              <p>Built with React 18 and Vite for lightning-fast development</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <h3>Secure API</h3>
              <p>RESTful API with Express.js and CORS protection</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <h3>Responsive</h3>
              <p>Mobile-first design that works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error loading users. Please check if the backend is running.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/users/${editingId}`, formData);
        alert('User updated successfully!');
      } else {
        await axios.post(`${API_URL}/users`, formData);
        alert('User created successfully!');
      }
      setFormData({ name: '', email: '', password: '' });
      setShowForm(false);
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert(error.response?.data?.error || 'Error saving user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        alert('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  return (
    <main className="container">
      <div className="users-page">
        <div className="page-header">
          <h1>User Management</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add User'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Edit User' : 'Create New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingId}
                  placeholder="Enter password"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update User' : 'Create User'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', email: '', password: '' });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-list">
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👥</span>
              <h3>No users yet</h3>
              <p>Click "Add User" to create your first user</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn-icon" onClick={() => handleEdit(user)}>✏️</button>
                        <button className="btn-icon" onClick={() => handleDelete(user.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    startDate: '',
    endDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Error loading projects. Please check if the backend is running.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/projects/${editingId}`, formData);
        alert('Project updated successfully!');
      } else {
        await axios.post(`${API_URL}/projects`, formData);
        alert('Project created successfully!');
      }
      setFormData({
        name: '',
        description: '',
        status: 'Planning',
        priority: 'Medium',
        startDate: '',
        endDate: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert(error.response?.data?.error || 'Error saving project. Please try again.');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ''
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        alert('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Planning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <main className="container">
      <div className="users-page">
        <div className="page-header">
          <h1>Project Management</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Project'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Edit Project' : 'Create New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Enter project description"
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    description: '',
                    status: 'Planning',
                    priority: 'Medium',
                    startDate: '',
                    endDate: ''
                  });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-list">
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <h3>No projects yet</h3>
              <p>Click "Add Project" to create your first project</p>
            </div>
          ) : (
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map(project => (
                <div key={project.id} className="project-card" style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '2px solid #e5e7eb',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>{project.name}</h3>
                    <div>
                      <button className="btn-icon" onClick={() => handleEdit(project)}>✏️</button>
                      <button className="btn-icon" onClick={() => handleDelete(project.id)}>🗑️</button>
                    </div>
                  </div>
                  <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: getStatusColor(project.status) + '20',
                      color: getStatusColor(project.status)
                    }}>
                      {project.status}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: getPriorityColor(project.priority) + '20',
                      color: getPriorityColor(project.priority)
                    }}>
                      {project.priority} Priority
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    <div>📅 Start: {new Date(project.startDate).toLocaleDateString()}</div>
                    {project.endDate && <div>🏁 End: {new Date(project.endDate).toLocaleDateString()}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    assignedTo: '',
    projectId: '',
    dueDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error loading tasks. Please check if the backend is running.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/tasks/${editingId}`, formData);
        alert('Task updated successfully!');
      } else {
        await axios.post(`${API_URL}/tasks`, formData);
        alert('Task created successfully!');
      }
      setFormData({
        title: '',
        description: '',
        status: 'Todo',
        priority: 'Medium',
        assignedTo: '',
        projectId: '',
        dueDate: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
      alert(error.response?.data?.error || 'Error saving task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo || '',
      projectId: task.projectId || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        alert('Task deleted successfully!');
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Todo': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <main className="container">
      <div className="users-page">
        <div className="page-header">
          <h1>Task Management</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Assigned To</label>
                  <input
                    type="text"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    placeholder="Enter assignee name"
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Task' : 'Create Task'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    description: '',
                    status: 'Todo',
                    priority: 'Medium',
                    assignedTo: '',
                    projectId: '',
                    dueDate: ''
                  });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-list">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">✅</span>
              <h3>No tasks yet</h3>
              <p>Click "Add Task" to create your first task</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Assigned To</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>
                        <strong>{task.title}</strong>
                        {task.description && <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{task.description}</div>}
                      </td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          background: getStatusColor(task.status) + '20',
                          color: getStatusColor(task.status)
                        }}>
                          {task.status}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          background: getPriorityColor(task.priority) + '20',
                          color: getPriorityColor(task.priority)
                        }}>
                          {task.priority}
                        </span>
                      </td>
                      <td>{task.assignedTo || '-'}</td>
                      <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                      <td>
                        <button className="btn-icon" onClick={() => handleEdit(task)}>✏️</button>
                        <button className="btn-icon" onClick={() => handleDelete(task.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="container">
      <div className="about-page">
        <h1>About This Application</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>🚀 Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h3>Frontend</h3>
                <ul>
                  <li>React 18</li>
                  <li>React Router</li>
                  <li>Axios</li>
                  <li>Vite</li>
                </ul>
              </div>
              <div className="tech-item">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB/MySQL</li>
                  <li>CORS</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>✨ Features</h2>
            <ul className="features-list">
              <li>✅ RESTful API architecture</li>
              <li>✅ User CRUD operations</li>
              <li>✅ Responsive design</li>
              <li>✅ Modern UI/UX</li>
              <li>✅ Form validation</li>
              <li>✅ Error handling</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>📚 API Endpoints</h2>
            <div className="api-docs">
              <div className="endpoint">
                <span className="method get">GET</span>
                <code>/api/users</code>
                <span>Get all users</span>
              </div>
              <div className="endpoint">
                <span className="method get">GET</span>
                <code>/api/users/:id</code>
                <span>Get user by ID</span>
              </div>
              <div className="endpoint">
                <span className="method post">POST</span>
                <code>/api/users</code>
                <span>Create new user</span>
              </div>
              <div className="endpoint">
                <span className="method put">PUT</span>
                <code>/api/users/:id</code>
                <span>Update user</span>
              </div>
              <div className="endpoint">
                <span className="method delete">DELETE</span>
                <code>/api/users/:id</code>
                <span>Delete user</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;

