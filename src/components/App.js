import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import SignupPage from './auth/SignupPage';
import SigninPage from './auth/SigninPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';

const App = () => (
  <BrowserRouter>
    {/* <SignupPage /> */}
    {/* <SigninPage /> */}
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
