import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './layout/Navbar';
import LandingPage from './static/LandingPage';
import SignupPage from './auth/SignupPage';
import SigninPage from './auth/SigninPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import HomePage from './protected/HomePage';
import ProfilePage from './protected/ProfilePage';
import NotFoundPage from './static/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
