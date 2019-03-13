import React from 'react';
import Provider from './chatContext/Provider';
import ChatSidebar from './ChatSidebar';
import Conversation from './Conversation';
import './ChatPage.scss';

const ChatPage = () => (
  <Provider>
    <div className="chat">
      <div className="chat__side">
        <ChatSidebar />
      </div>
      <div className="chat__main">
        <Conversation />
      </div>
    </div>
  </Provider>
);

export default ChatPage;
