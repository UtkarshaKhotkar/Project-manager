import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Clock, User, Flag } from 'lucide-react';

const TasksOverview = ({ tasks }) => {
  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success',
      'in-progress': 'text-warning',
      'todo': 'text-secondary',
      'blocked': 'text-error',
    };
    return colors[status] || 'text-secondary';
  };

  const getPriorityIcon = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success',
    };
    return colors[priority] || 'text-secondary';
  };

  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="tasks-overview">
      <div className="section-header">
        <h3 className="section-title">Recent Tasks</h3>
        <Link to="/tasks" className="section-link">
          View All <ExternalLink size={14} />
        </Link>
      </div>

      <div className="tasks-list">
        {recentTasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <div className="task-info">
                <h4 className="task-title">{task.title}</h4>
                <div className="task-meta">
                  <Flag size={12} className={getPriorityIcon(task.priority)} />
                  <span className="task-priority">{task.priority}</span>
                  <span className="task-separator">•</span>
                  <User size={12} />
                  <span className="task-assignee">{task.assignee}</span>
                </div>
              </div>
              <span className={`task-status ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="task-footer">
              <div className="task-due">
                <Clock size={12} />
                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="task-progress">
                {task.actualHours}h / {task.estimatedHours}h
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksOverview;