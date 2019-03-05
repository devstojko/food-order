import React from 'react';
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

export default ConversationHeader;
