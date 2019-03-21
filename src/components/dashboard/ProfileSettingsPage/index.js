import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from '@common/Button';
import Modal from '@common/Modal';
import Loading from '@common/Loading';
import PasswordUpdateForm from './PasswordUpdateForm';
import InfoUpdateForm from './InfoUpdateForm';
import AvatarUpload from '@common/AvatarUpload';
import firebase from '@fb';
import capitalize from '@helpers/capitalize';
import './ProfileSettingsPage.scss';

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
      <div className="settings-page">
        {user ? (
          <Fragment>
            <AvatarUpload />
            <div className="username">
              {`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}
            </div>
            {user.username && <h3 className="subtitle">{user.username}</h3>}
            <p>
              <FormattedMessage id="email" defaultMessage="Email Address" />:{' '}
              <strong>{user.email}</strong>
            </p>

            <div className="two-item-row">
              <div className="row-item">
                <Button text="changeInfo" onClick={this.toggleInfoModal} />
              </div>
              <div className="row-item">
                <Button text="changePw" onClick={this.togglePasswordModal} />
              </div>
            </div>

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
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ProfileSettingsPage);
