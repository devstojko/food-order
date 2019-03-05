import React from 'react';
import Avatar from '@common/Avatar';

const ListItem = ({ username, onItemClick }) => (
  <div className="chat-item" onClick={onItemClick}>
    <Avatar />
    <div className="chat-item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

export default ListItem;
