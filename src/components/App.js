import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/authActions';
import firebase from '../firebase';
import ProtectedRoute from './auth/ProtectedRoute';
import NonAuthOnlyRoute from './auth/NonAuthOnlyRoute';
import Navbar from './layout/Navbar';
import LandingPage from './static/LandingPage';
import SignupPage from './auth/SignupPage';
import SigninPage from './auth/SigninPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import HomePage from './protected/HomePage';
import ProfilePage from './protected/ProfilePage';
import NotFoundPage from './static/NotFoundPage';

class App extends Component {
  componentDidMount() {
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.setUser(authUser);
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
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <NonAuthOnlyRoute path="/signup" component={SignupPage} />
            <NonAuthOnlyRoute path="/signin" component={SigninPage} />
            <NonAuthOnlyRoute
              path="/forgot-password"
              component={ForgotPasswordPage}
            />
            <ProtectedRoute path="/home" component={HomePage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { setUser }
)(App);
