import React, { Component } from 'react';
import { connect } from 'react-redux';
import PasswordChangeForm from './PasswordChangeForm';
import firebase from '../../../firebase';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase
      .fetchUser(this.props.authUser.id)
      .then(doc => this.setState({ user: doc.data() }))
      .catch(err => toastr.error('Unable to fetch the user', err.message));
  }

  componentWillReceiveProps(newProps) {
    firebase
      .fetchUser(newProps.authUser.id)
      .then(doc => this.setState({ user: doc.data() }))
      .catch(err => toastr.error('Unable to fetch the user', err.message));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        {user && (
          <React.Fragment>
            <h1>User Data</h1>
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
            <h3>{user.email}</h3>
            <h3>{user.username}</h3>
          </React.Fragment>
        )}
        <PasswordChangeForm />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ProfilePage);
