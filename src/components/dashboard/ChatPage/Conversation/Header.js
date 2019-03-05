import React from 'react';
import Avatar from '@common/Avatar';

const ConversationHeader = () => (
  <div className="conversation__header">
    <Avatar size="large" />
    <div className="conversation__user">
      <strong>
        {otherUser.firstName} {otherUser.lastName}
      </strong>
      <span>Account Manager</span>
    </div>
    <i className="fas fa-times" />
  </div>
);

export default ConversationHeader;
