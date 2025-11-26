import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy load pages for performance optimization
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const Tasks = lazy(() => import('./pages/Tasks/Tasks'));
const Team = lazy(() => import('./pages/Team/Team'));
const Analytics = lazy(() => import('./pages/Analytics/Analytics'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;