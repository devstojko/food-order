import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { setUser } from '../store/actions/authActions';
import firebase from '../firebase';
import AppRouter from './routing/AppRouter';

class App extends Component {
  componentDidMount() {
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.setUser({
          email: authUser.email,
          id: authUser.uid
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Fragment>
        <ReduxToastr
          position="bottom-right"
          transitionIn="fadeIn"
          transtitionOut="fadeOut"
        />
        <AppRouter />
      </Fragment>
    );
  }
}

App.propTypes = {
  setUser: PropTypes.func
};

export default connect(
  null,
  { setUser }
)(App);
