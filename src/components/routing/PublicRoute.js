import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ authUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // !!authUser ? <Redirect to="/" /> : <Component {...props} /> ONLY WHILE DEVELOPING CHAT
      authUser ? <Redirect to="/chat" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps)(PublicRoute);
