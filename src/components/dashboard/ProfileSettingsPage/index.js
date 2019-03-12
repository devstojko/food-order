import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@common/Button';
import Modal from '@common/Modal';
import PasswordChangeForm from './PasswordChangeForm';
import firebase from '@fb';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showInfoModal: false,
      showPasswordModal: false
    };

    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.togglePasswordModal = this.togglePasswordModal.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  componentDidUpdate() {
    this.getUserProfile();
  }

  getUserProfile() {
    firebase
      .fetchUser(this.props.authUser.id)
      .then(doc => this.setState({ user: doc.data() }))
      .catch(err => toastr.error('Unable to fetch the user', err.message));
  }

  toggleInfoModal() {
    this.setState({ showInfoModal: !this.state.showInfoModal });
  }

  togglePasswordModal() {
    this.setState({ showPasswordModal: !this.state.showPasswordModal });
  }

  render() {
    const { user, showInfoModal, showPasswordModal } = this.state;

    return (
      <div className="container">
        {user && (
          <Fragment>
            <h2 className="title-primary" style={{ textAlign: 'left' }}>
              Your Account
            </h2>
            <p>First Name: {user.firstName || 'Not set'}</p>
            <p>Last Name: {user.lastName || 'Not set'}</p>
            <p>Username: {user.username || 'Not set'}</p>
            <p>Email Address: {user.email || 'Not set'}</p>

            <Button text="Change your info" onClick={this.toggleInfoModal} />
            <Button
              text="Change your password"
              onClick={this.togglePasswordModal}
            />
          </Fragment>
        )}

        {showInfoModal && (
          <Modal title="Update Your Profile" onClose={this.toggleInfoModal}>
            <h1>Info Form Placeholder</h1>
          </Modal>
        )}

        {showPasswordModal && (
          <Modal
            title="Update Your Password"
            onClose={this.togglePasswordModal}>
            <PasswordChangeForm />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ProfilePage);
