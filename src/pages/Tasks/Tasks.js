import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/slices/tasksSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Plus, Filter, Search } from 'lucide-react';

const Tasks = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading } = useSelector(state => state.tasks);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">Track and manage all project tasks</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="page-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-card-header">
              <h3 className="task-card-title">{task.title}</h3>
              <span className={`status-badge status-${task.status}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
            <p className="task-card-description">{task.description}</p>
            <div className="task-card-meta">
              <span className={`priority-badge priority-${task.priority}`}>
                {task.priority} priority
              </span>
              <span className="task-assignee">Assigned to: {task.assignee}</span>
              <span className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="task-card-progress">
              <span className="task-hours">
                {task.actualHours}h / {task.estimatedHours}h
              </span>
              <div className="task-tags">
                {task.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;