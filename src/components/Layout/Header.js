import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../store/slices/uiSlice';
import { Bell, Search, Moon, Sun, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { darkMode, notifications } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects, tasks, or team members..."
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button
          className="header-btn"
          onClick={() => dispatch(toggleDarkMode())}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button className="header-btn notification-btn" aria-label="Notifications">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
        
        <div className="user-menu">
          <button className="user-btn" aria-label="User menu">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;