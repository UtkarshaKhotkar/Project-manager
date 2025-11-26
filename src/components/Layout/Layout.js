import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => {
  const { sidebarOpen } = useSelector(state => state.ui);

  return (
    <div className="layout">
      <Sidebar />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;