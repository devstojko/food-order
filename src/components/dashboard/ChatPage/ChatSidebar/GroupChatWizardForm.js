import React, { Component } from 'react';
import Search from '@common/Search';
import Button from '@common/Button';
import UserList from './UserList';

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
  }

  changePage(pageNum) {
    this.setState({ page: pageNum });
  }

  changeGroupName(e) {
    this.setState({ groupName: e.target.value });
  }

  changeSearchTerm(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      // this.props.getUsers(this.state.searchTerm);
      console.log('search with this term...');
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('submitted');
  }

  render() {
    const { page, groupName, searchTerm, participants } = this.state;

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
            {searchTerm && <UserList />}

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
