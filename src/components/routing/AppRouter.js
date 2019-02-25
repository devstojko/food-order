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

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/signup" component={SignupPage} />
      <PublicRoute path="/signin" component={SigninPage} />
      <PublicRoute path="/forgot-password" component={ForgotPasswordPage} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/chat" component={ChatPage} />
      <PrivateRoute path="/profile-settings" component={ProfileSettingsPage} />
      <Route path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
