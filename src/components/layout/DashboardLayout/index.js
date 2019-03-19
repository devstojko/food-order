import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './DashboardPage.scss';

const DashboardPage = ({ children }) => (
  <div className="dashboard-page">
    <Sidebar />
    <div className="dashboard-page__right">
      <Navbar />
      <main className="dashboard-page__content">{children}</main>
    </div>
  </div>
);

export default DashboardPage;
