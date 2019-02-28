import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { setUser } from '@actions/authActions';
import { startLoading, finishLoading } from '@actions/loadingActions';
import firebase from '@fb';
import AppRouter from './routing/AppRouter';

class App extends Component {
  componentDidMount() {
    this.props.startLoading();
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.setUser({
          email: authUser.email,
          id: authUser.uid
        });
      }

      this.props.finishLoading();
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
        {this.props.loading ? <h1>Loading</h1> : <AppRouter />}
      </Fragment>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired
};

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(
  mapStateToProps,
  { setUser, startLoading, finishLoading }
)(App);
