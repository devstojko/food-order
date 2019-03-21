import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { setUser } from '@actions/authActions';
import { startLoading, finishLoading } from '@actions/loadingActions';
import firebase from '@fb';
import translations from '../translations';
import Loading from '@common/Loading';
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
    const { language } = this.props;

    return (
      <IntlProvider locale={language} messages={translations[language]}>
        <Fragment>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transtitionOut="fadeOut"
          />
          {this.props.loading ? <Loading /> : <AppRouter />}
        </Fragment>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired
};

const mapStateToProps = ({ loading, language }) => ({ loading, language });

export default connect(
  mapStateToProps,
  { setUser, startLoading, finishLoading }
)(App);
