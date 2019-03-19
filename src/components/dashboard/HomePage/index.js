import React from 'react';
import Card from '@common/Card';
import './HomePage.scss';

const HomePage = () => (
  <div className="homepage">
    <h1 className="homepage__title">Kragujevac</h1>

    <Card status="active" />
    <Card status="ordering" />
  </div>
);

export default HomePage;
