import React from 'react';
import ChatList from './ChatList';
import Conversation from './Conversation';
import MessageArea from './MessageArea';
import './ChatPage.scss';

const ChatPage = () => (
  <div className="chat">
    <div className="chat__sidebar">
      <div className="chat__search">
        {/* <Search /> */}
        <h1>Search Input Here</h1>
      </div>
      <ChatList />
    </div>
    <div className="chat__main-area">
      <Conversation />
      <MessageArea />
    </div>
  </div>
);

export default ChatPage;
