import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

class ProtectedRoute extends React.Component {
  componentDidMount() {
    // listen to firebase signin/logout
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      let condition = this.props.condition;
      // set the default condition if condition is not provided as a prop
      if (!condition) {
        condition = authUser => !!authUser;
      }
      // if the condition isn't satisfied, redirect to /signin
      if (!condition(authUser)) {
        this.props.history.push('/signin');
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { component: Component, condition, ...rest } = this.props;
    // set the default condition if condition is not provided as a prop
    const cond = condition ? condition : authUser => !!authUser;

    return (
      <Route
        {...rest}
        render={props =>
          cond(this.props.authUser) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps)(withRouter(ProtectedRoute));
