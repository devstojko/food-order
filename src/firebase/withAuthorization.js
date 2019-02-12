import React from 'react';
import { connect } from 'react-redux';
import { auth } from './index';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          console.log('REDIRECT HAPPENED');
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

  const mapStateToProps = state => ({ authUser: state.auth });
  return connect(mapStateToProps)(WithAuthorization);
};

export default withAuthorization;
