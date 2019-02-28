import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignupPage from '../auth/SignupPage';
import SigninPage from '../auth/SigninPage';
import ForgotPasswordPage from '../auth/ForgotPasswordPage';
import HomePage from '../dashboard/HomePage';
import ChatPage from '../dashboard/ChatPage';
import ProfileSettingsPage from '../dashboard/ProfileSettingsPage';
import NotFoundPage from '../static/NotFoundPage';

// testing
import firebase from '@fb';

export const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

// testing
class TestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getUsers = debounce(this.getUsers.bind(this), 1000);
  }

  getUsers(term) {
    firebase.fetchUsersByName(term).then(snapshots => {
      console.log('Snapshots received');
      snapshots.forEach(u => console.log(u.data()));
      console.log('---------------------');
    });
  }

  handleChange(e) {
    this.setState({ term: e.target.value }, () =>
      this.getUsers(this.state.term)
    );
  }

  render() {
    return (
      <div>
        <h1>Test Area</h1>
        <input
          type="text"
          value={this.state.term}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/signup" component={SignupPage} />
      <PublicRoute path="/signin" component={SigninPage} />
      <PublicRoute path="/forgot-password" component={ForgotPasswordPage} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/chat" component={ChatPage} />
      <PrivateRoute path="/profile-settings" component={ProfileSettingsPage} />
      {/* TESTING */}
      <PrivateRoute path="/test" component={TestPage} />
      <Route path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
