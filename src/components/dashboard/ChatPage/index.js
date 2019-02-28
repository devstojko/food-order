import React, { Component } from 'react';
import Search from '@common/Search';
import ChatList from './ChatList';
import Conversation from './Conversation';
import './ChatPage.scss';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // testing
    console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  }

  render() {
    return (
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__search">
            <Search
              value={this.state.searchValue}
              handleChange={this.handleChange}
              placeholder="Search Message or Name..."
            />
          </div>
          <ChatList />
        </div>
        <div className="chat__main-area">
          <Conversation />
        </div>
      </div>
    );
  }
}

export default ChatPage;
