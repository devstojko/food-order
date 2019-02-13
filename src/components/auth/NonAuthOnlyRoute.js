import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

class NonAuthOnlyRoute extends React.Component {
  componentDidMount() {
    // listen to firebase signin/logout
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (!!authUser) this.props.history.push('/home');
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { component: Component, condition, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !!this.props.authUser ? (
            <Redirect to="/home" />
          ) : (
            <Component {...this.props} />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps)(withRouter(NonAuthOnlyRoute));
