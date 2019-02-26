import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './DashboardPage.scss';

const DashboardPage = ({ children }) => (
  <div>
    <Navbar />
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__content">{children}</main>
    </div>
  </div>
);

export default DashboardPage;
