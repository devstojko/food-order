import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import sr from 'react-intl/locale-data/sr';
import store from './store';
import App from './components/App';
import 'react-circular-progressbar/dist/styles.css';
import './styles/global/index.scss';

addLocaleData(en);
addLocaleData(sr);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
