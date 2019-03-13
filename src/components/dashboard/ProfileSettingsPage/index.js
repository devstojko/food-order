import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgressbar from 'react-circular-progressbar';
import Button from '@common/Button';
import Modal from '@common/Modal';
import Avatar from '@common/Avatar';
import PasswordUpdateForm from './PasswordUpdateForm';
import InfoUpdateForm from './InfoUpdateForm';
import firebase from '@fb';
import './styles.scss';

class ProfileSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showInfoModal: false,
      showPasswordModal: false,
      avatarUploadProgress: 0,
      showProgress: false
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.togglePasswordModal = this.togglePasswordModal.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  handleUploadStart() {
    this.setState({ showProgress: true });
  }

  handleUploadSuccess(filename) {
    firebase
      .getAvatarUrl(filename)
      .then(url => {
        firebase
          .updateUser(this.props.authUser.id, { avatar: url })
          .then(() => {
            this.setState({ showProgress: false });
            toastr.success('Success', 'Avatar has been updated');
          })
          .catch(err => toastr.error('There was an error', err.message));
      })
      .catch(err => toastr.error('There was an error', err.message));
  }

  handleUploadError() {
    toastr.error('There was an error', 'Please try again');
  }

  handleProgress(progress) {
    this.setState({ avatarUploadProgress: progress });
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
    const {
      user,
      showInfoModal,
      showPasswordModal,
      avatarUploadProgress,
      showProgress
    } = this.state;

    return (
      <div className="container">
        {user && (
          <Fragment>
            <h2 className="title-primary" style={{ textAlign: 'left' }}>
              Your Account
            </h2>

            <div className="uploader-container">
              {showProgress && (
                <CircularProgressbar percentage={avatarUploadProgress} />
              )}
              <div className="uploader-wrapper">
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  randomizeFilename
                  storageRef={firebase.storage.ref('Avatars')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                  id="groupAvatarUpload"
                  hidden
                />
                <label
                  htmlFor="groupAvatarUpload"
                  style={{ cursor: 'pointer' }}
                >
                  <Avatar image={user.avatar} size="large" />
                </label>
              </div>
            </div>

            <p>First Name: {user.firstName || 'Not set'}</p>
            <p>Last Name: {user.lastName || 'Not set'}</p>
            <p>Username: {user.username || 'Not set'}</p>
            <p>Email Address: {user.email || 'Not set'}</p>

            <Button text="Change your info" onClick={this.toggleInfoModal} />
            <Button
              text="Change your password"
              onClick={this.togglePasswordModal}
            />

            {showInfoModal && (
              <Modal title="Update Your Profile" onClose={this.toggleInfoModal}>
                <InfoUpdateForm authUser={this.props.authUser} user={user} />
              </Modal>
            )}

            {showPasswordModal && (
              <Modal
                title="Update Your Password"
                onClose={this.togglePasswordModal}
              >
                <PasswordUpdateForm />
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
