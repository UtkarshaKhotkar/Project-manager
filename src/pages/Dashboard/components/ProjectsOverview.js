import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Clock, Users } from 'lucide-react';

const ProjectsOverview = ({ projects }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success',
      planning: 'text-warning',
      completed: 'text-primary',
      'on-hold': 'text-secondary',
    };
    return colors[status] || 'text-secondary';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success',
    };
    return colors[priority] || 'text-secondary';
  };

  return (
    <div className="projects-overview">
      <div className="section-header">
        <h3 className="section-title">Recent Projects</h3>
        <Link to="/projects" className="section-link">
          View All <ExternalLink size={14} />
        </Link>
      </div>

      <div className="projects-list">
        {projects.slice(0, 3).map(project => (
          <div key={project.id} className="project-item">
            <div className="project-header">
              <h4 className="project-name">{project.name}</h4>
              <span className={`project-priority ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="progress-text">{project.progress}%</span>
            </div>
            
            <div className="project-meta">
              <div className="meta-item">
                <Clock size={14} />
                <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <Users size={14} />
                <span>{project.teamMembers.length} members</span>
              </div>
              <span className={`project-status ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsOverview;