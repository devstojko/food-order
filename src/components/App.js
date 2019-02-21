import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/authActions';
import firebase from '../firebase';
import ProtectedRoute from './auth/ProtectedRoute';
import NonAuthOnlyRoute from './auth/NonAuthOnlyRoute';
import SignupPage from './auth/SignupPage';
import SigninPage from './auth/SigninPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import DashboardPage from './protected/DashboardPage';
import ProfilePage from './protected/ProfilePage';
import NotFoundPage from './static/NotFoundPage';

class App extends Component {
  componentDidMount() {
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.setUser({
          email: authUser.email,
          id: authUser.uid
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <NonAuthOnlyRoute path="/signup" component={SignupPage} />
            <NonAuthOnlyRoute path="/signin" component={SigninPage} />
            <NonAuthOnlyRoute
              path="/forgot-password"
              component={ForgotPasswordPage}
            />
            <ProtectedRoute path="/" component={DashboardPage} />
            <ProtectedRoute path="/dashboard" component={DashboardPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  setUser: PropTypes.func
};

export default connect(
  null,
  { setUser }
)(App);
