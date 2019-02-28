import React from 'react';
import Card from '@common/Card';
import './HomePage.scss';

const HomePage = () => (
  <main className="homepage">
    <h1 className="homepage__title">Kragujevac</h1>

    <Card status="active" />
    <Card status="ordering" />
  </main>
);

export default HomePage;
