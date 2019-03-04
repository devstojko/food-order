import React from 'react';
import SidebarListItem from './SidebarListItem';

const ChatList = ({ chats, onItemClick }) => (
  <div className="chat__list">
    <h3>Your Conversationss</h3>
    {chats.map(chat => (
      <SidebarListItem
        key={chat.id}
        id={chat.id}
        username={`${chat.otherUser.firstName} ${chat.otherUser.lastName}`}
        onItemClick={onItemClick}
      />
    ))}
  </div>
);

export default ChatList;
