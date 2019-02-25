import React from 'react';
import Card from '../../common/Card';
import './HomePage.scss';

const HomePage = () => (
  <main className="dashboard-content">
    <h1 className="dashboard-title">Kragujevac</h1>

    <Card status="active" />
    <Card status="ordering" />
  </main>
);

export default HomePage;
