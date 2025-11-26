import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectsSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Plus, Filter, Search } from 'lucide-react';

const Projects = () => {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector(state => state.projects);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Manage and track all your projects</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="page-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <h3 className="project-card-title">{project.name}</h3>
              <span className={`status-badge status-${project.status}`}>
                {project.status}
              </span>
            </div>
            <p className="project-card-description">{project.description}</p>
            <div className="project-card-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="progress-text">{project.progress}%</span>
            </div>
            <div className="project-card-footer">
              <span className="project-budget">
                ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
              </span>
              <span className="project-team">
                {project.teamMembers.length} members
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;