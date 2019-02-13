import React from 'react';
import { connect } from 'react-redux';
import firebase from './index';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push('/signin');
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      // don't render anything if there is no user in redux state
      return this.props.authUser ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = ({ authUser }) => ({ authUser });
  return connect(mapStateToProps)(WithAuthorization);
};

export default withAuthorization;
