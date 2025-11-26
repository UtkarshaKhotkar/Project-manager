import React from 'react';
import { FolderOpen, CheckSquare, Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const StatsCards = ({ analytics }) => {
  if (!analytics) return null;

  const { overview } = analytics;
  
  const stats = [
    {
      title: 'Active Projects',
      value: overview.activeProjects,
      total: overview.totalProjects,
      icon: FolderOpen,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'Completed Tasks',
      value: overview.completedTasks,
      icon: CheckSquare,
      color: 'green',
      trend: '+8%',
    },
    {
      title: 'Team Members',
      value: overview.teamMembers,
      icon: Users,
      color: 'purple',
      trend: '+2',
    },
    {
      title: 'Budget Utilization',
      value: `${Math.round((overview.spentBudget / overview.totalBudget) * 100)}%`,
      icon: DollarSign,
      color: 'orange',
      trend: '+5%',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className={`stat-icon ${getColorClasses(stat.color)}`}>
              <stat.icon size={20} />
            </div>
            <div className="stat-trend">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success text-sm font-semibold">{stat.trend}</span>
            </div>
          </div>
          
          <div className="stat-content">
            <div className="stat-value">
              {stat.value}
              {stat.total && <span className="stat-total">/{stat.total}</span>}
            </div>
            <div className="stat-title">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;