import React, { Component } from 'react';
import Search from '@common/Search';
import Button from '@common/Button';
import UserList from './UserList';
import firebase from '@fb';
import ListItem from './ListItem';

export default class GroupChatWizardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      groupName: '',
      searchTerm: '',
      participants: [],
      users: []
    };

    this.changeGroupName = this.changeGroupName.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.addToParticipants = this.addToParticipants.bind(this);
  }

  changePage(pageNum) {
    this.setState({ page: pageNum });
  }

  changeGroupName(e) {
    this.setState({ groupName: e.target.value });
  }

  changeSearchTerm(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      // search users with this term
      firebase
        .fetchUsersByName(this.state.searchTerm)
        .then(snapshots => {
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

  addToParticipants(user) {
    if (!this.state.participants.find(u => u.id === user.id)) {
      this.setState({ participants: [...this.state.participants, user] });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('submitted');
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
              <div>{p.firstName}</div>
            ))}

            {searchTerm && (
              <div>
                <h4>Add more users</h4>
                {users.map(user => (
                  <ListItem
                    key={user.id}
                    username={`${user.firstName} ${user.lastName}`}
                    onItemClick={() => this.addToParticipants(user)}
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
