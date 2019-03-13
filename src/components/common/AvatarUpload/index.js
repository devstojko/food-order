import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      progress: 0,
      imageUrl: ''
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  componentDidMount() {
    if (this.props.group) {
      this.setState({ imageUrl: this.props.initialImg });
    } else {
      firebase.fetchUser(this.props.authUser.id).then(doc => {
        this.setState({ imageUrl: doc.data().avatar });
      });
    }
  }

  handleUploadStart() {
    this.setState({ isLoading: true });
  }

  handleUploadSuccess(filename) {
    const { group, cb, authUser } = this.props;

    if (group) {
      // handle upload for groups
      firebase.getAvatarUrl(filename).then(url => {
        this.setState({ imageUrl: url });
        if (cb) cb(url);
      });
      this.setState({ isLoading: false, progress: 0 });
      toastr.success('Success', 'Avatar has been updated');
    } else {
      // handle upload for users
      firebase
        .getAvatarUrl(filename)
        .then(url => {
          firebase
            .updateUser(authUser.id, { avatar: url })
            .then(() => {
              this.setState({
                isLoading: false,
                progress: 0,
                imageUrl: url
              });
              toastr.success('Success', 'Avatar has been updated');
            })
            .catch(err => toastr.error('There was an error', err.message));
        })
        .catch(err => toastr.error('There was an error', err.message));
    }
  }

  handleUploadError() {
    this.setState({ isLoading: false, progress: 0 });
    toastr.error('There was an error', 'Please try again');
  }

  handleProgress(progress) {
    this.setState({ progress });
  }

  render() {
    const { isLoading, progress, imageUrl } = this.state;
    const width = this.props.width || 60;
    const height = this.props.height || 60;

    return (
      <div className="upload" style={{ width, height }}>
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
            <Avatar image={imageUrl} size="large" />
          </label>
        </div>
      </div>
    );
  }
}

AvatarUpload.propTypes = {
  authUser: PropTypes.object.isRequired,
  group: PropTypes.bool,
  cb: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  initialImg: PropTypes.string
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(AvatarUpload);
