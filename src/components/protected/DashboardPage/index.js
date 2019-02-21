import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import './DashboardPage.scss';

const DashboardPage = () => (
  <div>
    <Navbar />
    <div className="dashboard">
      <Sidebar />
      <DashboardContent />
    </div>
  </div>
);

export default DashboardPage;
