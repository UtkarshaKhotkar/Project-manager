import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeamMembers } from '../../../store/slices/teamSlice';
import { ExternalLink, User, CheckCircle, Clock } from 'lucide-react';

const TeamOverview = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector(state => state.team);

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchTeamMembers());
    }
  }, [dispatch, members.length]);

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return 'text-error';
    if (workload >= 75) return 'text-warning';
    return 'text-success';
  };

  if (loading) {
    return (
      <div className="team-overview">
        <div className="section-header">
          <h3 className="section-title">Team Overview</h3>
        </div>
        <div className="flex-center" style={{ minHeight: '200px' }}>
          <div className="text-secondary">Loading team data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="team-overview">
      <div className="section-header">
        <h3 className="section-title">Team Overview</h3>
        <Link to="/team" className="section-link">
          View All <ExternalLink size={14} />
        </Link>
      </div>

      <div className="team-grid">
        {members.slice(0, 5).map(member => (
          <div key={member.id} className="team-member">
            <div className="member-avatar">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} />
              ) : (
                <User size={20} />
              )}
            </div>
            
            <div className="member-info">
              <h4 className="member-name">{member.name}</h4>
              <p className="member-role">{member.role}</p>
              
              <div className="member-stats">
                <div className="stat-item">
                  <CheckCircle size={12} />
                  <span>{member.completedTasks} completed</span>
                </div>
                <div className="stat-item">
                  <Clock size={12} />
                  <span>{member.currentTasks} active</span>
                </div>
              </div>
              
              <div className="workload-indicator">
                <div className="workload-bar">
                  <div 
                    className="workload-fill" 
                    style={{ 
                      width: `${member.workload}%`,
                      backgroundColor: member.workload >= 90 ? '#ef4444' : 
                                     member.workload >= 75 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className={`workload-text ${getWorkloadColor(member.workload)}`}>
                  {member.workload}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOverview;