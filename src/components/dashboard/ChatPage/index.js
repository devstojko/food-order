import React from 'react';
import Search from 'common/Search';
import ChatList from './ChatList';
import Conversation from './Conversation';
import './ChatPage.scss';

const ChatPage = () => (
  <div className="chat">
    <div className="chat__sidebar">
      <div className="chat__search">
        <Search placeholder="Search Message or Name..." />
      </div>
      <ChatList />
    </div>
    <div className="chat__main-area">
      <Conversation />
    </div>
  </div>
);

export default ChatPage;
