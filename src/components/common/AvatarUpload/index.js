import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import './AvatarUpload.scss';

class AvatarUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      progress: 0
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  handleUploadStart() {
    this.setState({ isLoading: true });
  }

  handleUploadSuccess(filename) {
    firebase
      .getAvatarUrl(filename)
      .then(url => {
        firebase
          .updateUser(this.props.authUser.id, { avatar: url })
          .then(() => {
            this.setState({ isLoading: false, progress: 0 });
            toastr.success('Success', 'Avatar has been updated');
          })
          .catch(err => toastr.error('There was an error', err.message));
      })
      .catch(err => toastr.error('There was an error', err.message));
  }

  handleUploadError() {
    this.setState({ isLoading: false, progress: 0 });
    toastr.error('There was an error', 'Please try again');
  }

  handleProgress(progress) {
    this.setState({ progress });
  }

  render() {
    const { isLoading, progress } = this.state;

    return (
      <div className="upload">
        {isLoading && <CircularProgressbar percentage={progress} />}
        <div className="upload__wrapper">
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
          <label htmlFor="groupAvatarUpload" style={{ cursor: 'pointer' }}>
            <Avatar image={this.props.authUser.avatar} size="large" />
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(AvatarUpload);
