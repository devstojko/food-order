import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withChatContext } from '../chatContext/withChatContext';
import Search from '@common/Search';
import Button from '@common/Button';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import ListItem from '../ChatSidebar/ListItem';
import AvatarUpload from '@common/AvatarUpload';
import defaultGroupImg from '@images/groupDefault.png';
import capitalize from '@helpers/capitalize';

const INITIAL_STATE = {
  page: 1,
  groupName: '',
  searchTerm: '',
  participants: [],
  users: [],
  avatarUrl: ''
};

class WizardForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.setAvatarUrl = this.setAvatarUrl.bind(this);
    this.changeGroupName = this.changeGroupName.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.toggleParticipant = this.toggleParticipant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setAvatarUrl(url) {
    this.setState({ avatarUrl: url });
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

  toggleParticipant(user) {
    if (!this.state.participants.find(u => u.id === user.id)) {
      this.setState({ participants: [...this.state.participants, user] });
    } else {
      this.setState({
        participants: this.state.participants.filter(p => p.id !== user.id)
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // populate participants array with references to all chat users
    const participants = [firebase.userReference(this.props.authUser.id)];
    this.state.participants.forEach(p =>
      participants.push(firebase.userReference(p.id))
    );

    const groupChat = {
      groupName: this.state.groupName,
      avatar: this.state.avatarUrl,
      participants
    };

    firebase.createGroupChat(groupChat);
    this.setState({ ...INITIAL_STATE });
    this.props.context.toggleModal();
  }

  render() {
    const { page, groupName, searchTerm, participants, users } = this.state;

    return (
      <form className="group-form" onSubmit={this.handleSubmit}>
        {page === 1 && (
          <Fragment>
            <AvatarUpload
              group={true}
              cb={this.setAvatarUrl}
              initialImg={defaultGroupImg}
            />

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
            <Search
              value={searchTerm}
              handleChange={this.changeSearchTerm}
              placeholder="Add users to this conversation"
            />

            {participants.length > 0 ? (
              <Fragment>
                <h5 className="group-form__title">Conversation Participants</h5>
                {participants.map(p => (
                  <Avatar image={p.avatar} key={p.id} />
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
                      avatar={user.avatar}
                      username={`${capitalize(user.firstName)} ${capitalize(
                        user.lastName
                      )}`}
                      onItemClick={() => this.toggleParticipant(user)}
                    />
                    {this.state.participants.find(u => u.id === user.id) && (
                      <i className="fas fa-check-square" />
                    )}
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
