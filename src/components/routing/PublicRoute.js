import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ authUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!authUser ? <Redirect to="/chat" /> : <Component {...props} />
    }
  />
  // change later to /
);

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps)(PublicRoute);
