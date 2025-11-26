import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Menu,
  Zap
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { sidebarOpen } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Zap className="logo-icon" />
          {sidebarOpen && <span className="logo-text">SPMD</span>}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={20} className="nav-icon" />
            {sidebarOpen && <span className="nav-label">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;