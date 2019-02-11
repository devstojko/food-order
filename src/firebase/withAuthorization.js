import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebase } from './firebase';
import { AuthUserContext } from './AuthUserContext';

export const withAuthorization = condition => Component => {
  class WithAuthorization extends Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push('/signin');
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withAuthorization);
};
