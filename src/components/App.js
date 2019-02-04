import React from 'react';
import webpackImg from '../images/webpack.png';
import reactImg from '../images/react.svg';

const App = () => (
  <div>
    <h1>Webpack Setup</h1>
    <img src={webpackImg} alt="webpack"/>
    <img src={reactImg} alt="react"/>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default App;