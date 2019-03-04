import React from 'react';
import Avatar from '@common/Avatar';

const SidebarListItem = ({ id, username, onItemClick }) => (
  <div className="chat-item" onClick={() => onItemClick(id)}>
    <Avatar />
    <div className="chat-item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

export default SidebarListItem;
