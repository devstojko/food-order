import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import SignupPage from './SignupPage';
import SigninPage from './SigninPage';
import ForgotPasswordPage from './ForgotPasswordPage';

const App = () => (
  <BrowserRouter>
    <SigninPage/>
    {/* <SignupPage/> */}
    {/* <ForgotPasswordPage/> */}
    {/* <Switch>
      <Route exact path="/" component={IndexPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/signin" component={SigninPage}/>
      <Route path="/forgot-password" component={ForgotPasswordPage}/>
    </Switch> */}
  </BrowserRouter>
);

export default App;