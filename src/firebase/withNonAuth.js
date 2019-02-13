import React from 'react';
import { connect } from 'react-redux';
import { auth } from './index';
import { Redirect } from 'react-router-dom';

const withNonAuth = Component => {
  class WitnNonAuth extends React.Component {
    componentDidMount() {
      this.listener = auth.onAuthStateChanged(authUser => {
        if (!!authUser) this.props.history.push('/home');
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return this.props.authUser ? (
        <Component {...this.props} />
      ) : (
        <Redirect to="/home" />
      );
    }
  }

  const mapStateToProps = state => ({ authUser: state.auth });
  return connect(mapStateToProps)(WitnNonAuth);
};

export default withNonAuth;
