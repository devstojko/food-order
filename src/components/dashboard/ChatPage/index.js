import React, { Component } from 'react';
import Provider from './chatContext/Provider';
import ChatSidebar from './ChatSidebar';
import Conversation from './Conversation';
import './ChatPage.scss';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebarOnSmall: true
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebarOnSmall: !this.state.showSidebarOnSmall });
  }

  render() {
    const { showSidebarOnSmall } = this.state;

    return (
      <Provider>
        <div className="chat">
          <div className={`chat__side ${showSidebarOnSmall ? 'open' : ''}`}>
            <ChatSidebar toggleSidebar={this.toggleSidebar} />
          </div>
          <div className={`chat__main ${showSidebarOnSmall ? '' : 'open'}`}>
            <Conversation toggleSidebar={this.toggleSidebar} />
          </div>
        </div>
      </Provider>
    );
  }
}

export default ChatPage;
