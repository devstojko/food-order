import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import DashboardPage from 'layout/DashboardLayout';

const PrivateRoute = ({ authUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <DashboardPage>
          <Component {...props} />
        </DashboardPage>
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps)(PrivateRoute);
