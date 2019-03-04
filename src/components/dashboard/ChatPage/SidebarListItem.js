import React from 'react';
import Avatar from '@common/Avatar';

const SidebarListItem = ({ id, username }) => (
  <div className="chat-item" onClick={() => console.log('this will log id')}>
    <Avatar />
    <div className="chat-item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

export default SidebarListItem;
