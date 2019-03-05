import React, { Component } from 'react';
import { Consumer } from '../chatContext';
import Search from '@common/Search';
import ChatList from './ChatList';
import UserList from './UserList';

class ChatSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      this.props.getUsers(this.state.searchTerm); //props
    });
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="chat__sidebar">
        <div className="chat__search">
          <Search
            value={searchTerm}
            handleChange={this.handleChange}
            placeholder="Search Message or Name..."
          />
        </div>
        <div className="chat__list">
          <ChatList />
          {searchTerm && <UserList />}
        </div>
      </div>
    );
  }
}

const ChatSidebarWithContext = props => (
  <Consumer>
    {({ getUsers }) => <ChatSidebar getUsers={getUsers} {...props} />}
  </Consumer>
);

export default ChatSidebarWithContext;
