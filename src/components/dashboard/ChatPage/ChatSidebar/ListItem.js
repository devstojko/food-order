import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@common/Avatar';

const ListItem = ({ username, avatar, onItemClick }) => (
  <div className="chat-sidebar__item" onClick={onItemClick}>
    <Avatar image={avatar} />
    <div className="chat-sidebar__item__text">
      <strong>{username}</strong>
    </div>
  </div>
);

ListItem.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onItemClick: PropTypes.func.isRequired
};

export default ListItem;
