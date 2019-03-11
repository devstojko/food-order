import React from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import Avatar from '@common/Avatar';

const ConversationHeader = ({ title, context }) => (
  <div className="conversation__header">
    <Avatar size="large" />
    <div className="conversation__title">
      <strong>{title}</strong>
      <span>Account Manager</span>
    </div>
    <i className="fas fa-times" onClick={() => context.setOtherUser(null)} />
  </div>
);

ConversationHeader.propTypes = {
  title: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired
};

export default withChatContext(ConversationHeader);
