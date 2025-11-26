import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalytics } from '../../store/slices/analyticsSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const dispatch = useDispatch();
  const { data: analytics, loading } = useSelector(state => state.analytics);

  useEffect(() => {
    if (!analytics) {
      dispatch(fetchAnalytics());
    }
  }, [dispatch, analytics]);

  if (loading || !analytics) {
    return <LoadingSpinner />;
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Project insights and performance metrics</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3 className="analytics-title">Project Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.projectProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
              <Bar dataKey="planned" fill="#6b7280" name="Planned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card">
          <h3 className="analytics-title">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.taskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {analytics.taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card full-width">
          <h3 className="analytics-title">Team Productivity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.teamProductivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasksCompleted" fill="#2563eb" name="Tasks Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card">
          <h3 className="analytics-title">Budget Analysis</h3>
          <div className="budget-list">
            {analytics.budgetAnalysis.map((project, index) => (
              <div key={index} className="budget-item">
                <div className="budget-header">
                  <span className="budget-project">{project.project}</span>
                  <span className="budget-percentage">
                    {Math.round((project.spent / project.budget) * 100)}%
                  </span>
                </div>
                <div className="budget-bar">
                  <div 
                    className="budget-fill" 
                    style={{ width: `${(project.spent / project.budget) * 100}%` }}
                  />
                </div>
                <div className="budget-amounts">
                  <span>${project.spent.toLocaleString()} spent</span>
                  <span>${project.remaining.toLocaleString()} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="analytics-title">Risk Assessment</h3>
          <div className="risk-overview">
            <div className="risk-stats">
              <div className="risk-stat">
                <span className="risk-number text-error">{analytics.riskAssessment.highRisk}</span>
                <span className="risk-label">High Risk</span>
              </div>
              <div className="risk-stat">
                <span className="risk-number text-warning">{analytics.riskAssessment.mediumRisk}</span>
                <span className="risk-label">Medium Risk</span>
              </div>
              <div className="risk-stat">
                <span className="risk-number text-success">{analytics.riskAssessment.lowRisk}</span>
                <span className="risk-label">Low Risk</span>
              </div>
            </div>
            <div className="risk-predictions">
              {analytics.riskAssessment.predictions.map((prediction, index) => (
                <div key={index} className="risk-item">
                  <div className="risk-project">{prediction.project}</div>
                  <div className={`risk-level risk-${prediction.riskLevel}`}>
                    {prediction.riskLevel} risk
                  </div>
                  <div className="risk-probability">
                    {prediction.delayProbability}% delay probability
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;