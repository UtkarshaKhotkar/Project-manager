import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeamMembers } from '../../store/slices/teamSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Plus, Filter, Search, Mail, User } from 'lucide-react';

const Team = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector(state => state.team);

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchTeamMembers());
    }
  }, [dispatch, members.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="team-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Team</h1>
          <p className="page-subtitle">Manage team members and their workload</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="page-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search team members..."
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="team-grid">
        {members.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-card-header">
              <div className="member-avatar-large">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div className="member-info-header">
                <h3 className="member-card-name">{member.name}</h3>
                <p className="member-card-role">{member.role}</p>
                <div className="member-contact">
                  <Mail size={14} />
                  <span>{member.email}</span>
                </div>
              </div>
            </div>

            <div className="member-skills">
              <h4 className="skills-title">Skills</h4>
              <div className="skills-list">
                {member.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="member-stats-detailed">
              <div className="stat-row">
                <span className="stat-label">Current Tasks:</span>
                <span className="stat-value">{member.currentTasks}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Completed:</span>
                <span className="stat-value">{member.completedTasks}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Workload:</span>
                <span className={`stat-value ${
                  member.workload >= 90 ? 'text-error' : 
                  member.workload >= 75 ? 'text-warning' : 'text-success'
                }`}>
                  {member.workload}%
                </span>
              </div>
            </div>

            <div className="workload-bar-large">
              <div 
                className="workload-fill" 
                style={{ 
                  width: `${member.workload}%`,
                  backgroundColor: member.workload >= 90 ? '#ef4444' : 
                                 member.workload >= 75 ? '#f59e0b' : '#10b981'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;