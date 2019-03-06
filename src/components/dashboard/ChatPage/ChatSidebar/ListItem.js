import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@common/Avatar';

const ListItem = ({ username, onItemClick }) => (
  <div className="chat-sidebar__item" onClick={onItemClick}>
    <Avatar />
    <div className="chat-sidebar__item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

ListItem.propTypes = {
  username: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default ListItem;
