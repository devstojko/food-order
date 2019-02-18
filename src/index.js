import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import store from './store';
import App from './components/App';
import './styles/global/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      position="bottom-right"
      transitionIn="fadeIn"
      transtitionOut="fadeOut"
    />
    <App />
  </Provider>,
  document.getElementById('root')
);
