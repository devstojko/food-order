import React from 'react';
import webpackImg from '../images/webpack.png';
import reactImg from '../images/react.svg';

const App = () => (
  <div>
    <h1>Webpack Setup</h1>
    <img src={webpackImg} alt="webpack"/>
    <img src={reactImg} alt="react"/>
    <hr/>
    <i className="fab fa-react"></i>
    <i className="fas fa-address-card"></i>
    <i className="fab fa-amazon-pay"></i>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default App;