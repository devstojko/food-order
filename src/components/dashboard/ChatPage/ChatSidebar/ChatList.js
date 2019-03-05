import React from 'react';
import { Consumer } from '../chatContext';
import ListItem from './ListItem';

const ChatList = () => (
  <Consumer>
    {({ myChats, setActiveChat }) => (
      <div className="chat__list">
        <h3>Your Conversationss</h3>
        {myChats.map(chat => (
          <ListItem
            key={chat.id}
            username={`${chat.otherUser.firstName} ${chat.otherUser.lastName}`}
            onItemClick={() => setActiveChat(chat.id, chat.otherUser)}
          />
        ))}
      </div>
    )}
  </Consumer>
);

export default ChatList;
