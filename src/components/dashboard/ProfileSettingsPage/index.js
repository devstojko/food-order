import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@common/Button';
import Modal from '@common/Modal';
import PasswordUpdateForm from './PasswordUpdateForm';
import InfoUpdateForm from './InfoUpdateForm';
import AvatarUpload from '@common/AvatarUpload';
import firebase from '@fb';
import capitalize from '@helpers/capitalize';

class ProfileSettingsPage extends Component {
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
    this.listener = firebase
      .userReference(this.props.authUser.id)
      .onSnapshot(user => {
        if (user.exists) {
          const { firstName, lastName, username, avatar, email } = user.data();
          this.setState({
            user: {
              firstName,
              lastName,
              username,
              avatar,
              email
            }
          });
        }
      });
  }

  componentWillUnmount() {
    this.listener();
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

            <AvatarUpload />

            <p>
              First Name: <strong>{capitalize(user.firstName)}</strong>
            </p>
            <p>
              Last Name: <strong>{capitalize(user.lastName)}</strong>
            </p>
            <p>
              Username:{' '}
              <strong>
                {user.username || `${user.firstName} ${user.lastName}`}
              </strong>
            </p>
            <p>
              Email Address: <strong>{user.email}</strong>
            </p>

            <Button text="Change your info" onClick={this.toggleInfoModal} />
            <Button
              text="Change your password"
              onClick={this.togglePasswordModal}
            />

            {showInfoModal && (
              <Modal title="Update Your Profile" onClose={this.toggleInfoModal}>
                <InfoUpdateForm
                  authUser={this.props.authUser}
                  user={user}
                  closeModal={this.toggleInfoModal}
                />
              </Modal>
            )}

            {showPasswordModal && (
              <Modal
                title="Update Your Password"
                onClose={this.togglePasswordModal}>
                <PasswordUpdateForm closeModal={this.togglePasswordModal} />
              </Modal>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ProfileSettingsPage);
