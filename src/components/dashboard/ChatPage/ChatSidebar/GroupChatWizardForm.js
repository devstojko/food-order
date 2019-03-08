import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '@common/Search';
import Button from '@common/Button';
import firebase from '@fb';
import ListItem from './ListItem';

const INITIAL_STATE = {
  page: 1,
  groupName: '',
  searchTerm: '',
  participants: [],
  users: []
};

class GroupChatWizardForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.changeGroupName = this.changeGroupName.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.removePatricipant = this.removePatricipant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    const participants = [firebase.userReference(this.props.authUser.id)];
    this.state.participants.forEach(p =>
      participants.push(firebase.userReference(p.id))
    );

    firebase.createGroupChat(this.state.groupName, participants);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { page, groupName, searchTerm, participants, users } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {page === 1 && (
          <div>
            <h3>User avatar placeholder</h3>
            <input value={groupName} onChange={this.changeGroupName} />

            <Button
              text="Next"
              onClick={() => this.changePage(2)}
              disabled={!groupName.length > 0}
            />
          </div>
        )}

        {page === 2 && (
          <div>
            <h3>{groupName}</h3>

            <Search
              value={searchTerm}
              handleChange={this.changeSearchTerm}
              placeholder="Add users to this conversation"
            />
            <h4>Conversation Participants</h4>
            {participants.map(p => (
              <ListItem
                key={p.id}
                username={`${p.firstName} ${p.lastName}`}
                onItemClick={() => this.removePatricipant(p.id)}
              />
            ))}

            {searchTerm && (
              <div>
                <h4>Add more users</h4>
                {users.map(user => (
                  <ListItem
                    key={user.id}
                    username={`${user.firstName} ${user.lastName}`}
                    onItemClick={() => this.addParticipant(user)}
                  />
                ))}
              </div>
            )}

            <Button
              style="secondary"
              text="Go Back"
              onClick={() => this.changePage(1)}
            />
            <Button
              type="submit"
              text="Create"
              disabled={!participants.length > 0}
            />
          </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(GroupChatWizardForm);
