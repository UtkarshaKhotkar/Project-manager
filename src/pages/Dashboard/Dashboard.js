import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { fetchTasks } from '../../store/slices/tasksSlice';
import { fetchAnalytics } from '../../store/slices/analyticsSlice';
import StatsCards from './components/StatsCards';
import ProjectsOverview from './components/ProjectsOverview';
import TasksOverview from './components/TasksOverview';
import TeamOverview from './components/TeamOverview';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { 
    projects, 
    tasks, 
    analytics 
  } = useSelector(state => ({
    projects: state.projects,
    tasks: state.tasks,
    analytics: state.analytics,
  }));

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (projects.loading || tasks.loading || analytics.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Project Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's what's happening with your projects today.
        </p>
      </div>

      <div className="dashboard-content">
        <StatsCards analytics={analytics.data} />
        
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <ProjectsOverview projects={projects.items} />
          </div>
          
          <div className="dashboard-section">
            <TasksOverview tasks={tasks.items} />
          </div>
          
          <div className="dashboard-section full-width">
            <TeamOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;