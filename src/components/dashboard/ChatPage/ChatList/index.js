import React from 'react';
import Avatar from '../../../common/Avatar';
import './ChatList.scss';

const dummyChats = [1, 2, 3, 4, 5, 6];

const ChatListItem = () => (
  <div className="chat-item">
    <Avatar />
    <div className="chat-item__text">
      <strong>User Name</strong>
      <span>Last message text</span>
    </div>
    <div className="chat-item__time">13 min ago</div>
  </div>
);

const ChatList = () => (
  <div className="chat-list">
    {dummyChats.map(c => (
      <ChatListItem key={c} />
    ))}
  </div>
);

export default ChatList;
