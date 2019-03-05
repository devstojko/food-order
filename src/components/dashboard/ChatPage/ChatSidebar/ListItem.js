import React from 'react';
import Avatar from '@common/Avatar';

const ListItem = ({ username, onItemClick }) => (
  <div className="chat-sidebar__item" onClick={onItemClick}>
    <Avatar />
    <div className="chat-sidebar__item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

export default ListItem;
