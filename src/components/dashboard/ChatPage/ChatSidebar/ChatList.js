import React from 'react';
import ListItem from './ListItem';

const ChatList = ({ chats, setActiveChat }) => (
  <div className="chat__list">
    <h3>Your Conversationss</h3>
    {chats.map(chat => (
      <ListItem
        key={chat.id}
        id={chat.id}
        username={`${chat.otherUser.firstName} ${chat.otherUser.lastName}`}
        onItemClick={() => setActiveChat(chat.id, chat.otherUser)}
      />
    ))}
  </div>
);

export default ChatList;
