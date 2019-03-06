import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../chatContext';
import Avatar from '@common/Avatar';

const ConversationHeader = ({ username }) => (
  <Consumer>
    {({ setOtherUser }) => (
      <div className="conversation__header">
        <Avatar size="large" />
        <div className="conversation__user">
          <strong>{username}</strong>
          <span>Account Manager</span>
        </div>
        <i className="fas fa-times" onClick={() => setOtherUser(null)} />
      </div>
    )}
  </Consumer>
);

ConversationHeader.propTypes = {
  username: PropTypes.string.isRequired
};

export default ConversationHeader;
