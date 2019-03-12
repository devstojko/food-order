import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import FileUploader from 'react-firebase-file-uploader';
import { withChatContext } from '../chatContext/withChatContext';
import Avatar from '@common/Avatar';
import Search from '@common/Search';
import Button from '@common/Button';
import firebase from '@fb';
import ListItem from '../ChatSidebar/ListItem';

const INITIAL_STATE = {
  page: 1,
  groupName: '',
  searchTerm: '',
  participants: [],
  users: [],
  avatarUploadProgress: 0,
  avatarSrc: ''
};

class WizardForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.changeGroupName = this.changeGroupName.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.removePatricipant = this.removePatricipant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUploadError() {
    toastr.error('There was an error', 'Please try again');
  }

  handleUploadSuccess(filename) {
    // associate this filename with the user
    // ..
    this.setState({ avatarSrc: filename });
    toastr.success('Congratulations', 'Avatar image uploaded successfully');
  }

  handleProgress(progress) {
    this.setState({ avatarUploadProgress: progress });
  }

  changePage(pageNum) {
    this.setState({ page: pageNum });
  }

  changeGroupName(e) {
    this.setState({ groupName: e.target.value });
  }

  changeSearchTerm(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      firebase
        .fetchUsersByName(this.state.searchTerm)
        .then(snapshots => {
          this.setState({ users: [] });
          if (!snapshots.empty) {
            snapshots.forEach(u => {
              const user = { id: u.id, ...u.data() };
              this.setState({ users: [...this.state.users, user] });
            });
          }
        })
        .catch(err => console.log(err));
    });
  }

  addParticipant(user) {
    if (!this.state.participants.find(u => u.id === user.id)) {
      this.setState({ participants: [...this.state.participants, user] });
    }
  }

  removePatricipant(id) {
    this.setState({
      participants: this.state.participants.filter(p => p.id !== id)
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // populate participants array with references to all chat users
    const participants = [firebase.userReference(this.props.authUser.id)];
    this.state.participants.forEach(p =>
      participants.push(firebase.userReference(p.id))
    );

    firebase.createGroupChat(this.state.groupName, participants);
    this.setState({ ...INITIAL_STATE });
    this.props.context.toggleModal();
  }

  render() {
    const {
      page,
      groupName,
      searchTerm,
      participants,
      users,
      avatarSrc
    } = this.state;

    return (
      <form className="group-form" onSubmit={this.handleSubmit}>
        {page === 1 && (
          <Fragment>
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage.ref('Avatars')}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <Avatar src={avatarSrc} size="large" />

            <div className="field">
              <input
                className="field__text"
                id="group-name"
                value={groupName}
                onChange={this.changeGroupName}
                required
              />
              <span className="field__highlight" />
              <span className="field__bar" />
              <label className="field__label" htmlFor="group-name">
                Enter Group Name
              </label>
            </div>

            <Button
              text="Next"
              onClick={() => this.changePage(2)}
              disabled={!groupName.length > 0}
            />
          </Fragment>
        )}

        {page === 2 && (
          <Fragment>
            <h3 className="group-form__title">{groupName}</h3>

            <Search
              value={searchTerm}
              handleChange={this.changeSearchTerm}
              placeholder="Add users to this conversation"
            />

            {participants.length > 0 ? (
              <Fragment>
                <h5 className="group-form__title">Conversation Participants</h5>
                {participants.map(p => (
                  <ListItem
                    key={p.id}
                    username={`${p.firstName} ${p.lastName}`}
                    onItemClick={() => this.removePatricipant(p.id)}
                  />
                ))}
              </Fragment>
            ) : (
              <h5 className="group-form__title">
                Add Conversation Participants
              </h5>
            )}

            {searchTerm && (
              <Fragment>
                <h5 className="group-form__title">Search Results</h5>
                {users.map(user => (
                  <div className="group-form__user" key={user.id}>
                    <ListItem
                      username={`${user.firstName} ${user.lastName}`}
                      onItemClick={() => this.addParticipant(user)}
                    />
                    <i className="fas fa-check-square" />
                  </div>
                ))}
              </Fragment>
            )}

            <div className="two-item-row">
              <div className="row-item">
                <Button
                  style="secondary"
                  text="Go Back"
                  onClick={() => this.changePage(1)}
                />
              </div>

              <div className="row-item">
                <Button
                  type="submit"
                  text="Create"
                  disabled={!participants.length > 0}
                />
              </div>
            </div>
          </Fragment>
        )}
      </form>
    );
  }
}

WizardForm.propTypes = {
  authUser: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(withChatContext(WizardForm));
