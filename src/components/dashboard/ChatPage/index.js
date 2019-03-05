import React from 'react';
import { Provider } from './chatContext';
import ChatSidebar from './ChatSidebar';
import Conversation from './Conversation';
import './ChatPage.scss';

const ChatPage = () => (
  <Provider>
    <div className="chat">
      <div className="chat__sidebar">
        <ChatSidebar />
      </div>
      <div className="chat__main-area">
        <Conversation />
      </div>
    </div>
  </Provider>
);

export default ChatPage;
