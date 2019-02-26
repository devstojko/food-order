import React from 'react';
import './ChatList.scss';

const dummyChats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const ChatList = () => (
  <div className="chat-list">
    {dummyChats.map(c => (
      <div key={c} className="chat-list__item">
        {c}
      </div>
    ))}
  </div>
);

export default ChatList;
