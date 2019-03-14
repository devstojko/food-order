import React from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import Avatar from '@common/Avatar';
import capitalize from '@helpers/capitalize';
import defaultGroupImg from '@images/groupDefault.png';

const ConversationHeader = ({ context }) => {
  const { otherUser, activeChat, setOtherUser } = context;

  let title;
  let info;
  let avatar;
  if (activeChat) {
    if (activeChat.groupName) {
      title = activeChat.groupName;
      info = `${activeChat.participants.length} participants`;
      avatar = activeChat.avatar ? activeChat.avatar : defaultGroupImg;
    } else {
      title = `${capitalize(activeChat.otherUser.firstName)} ${capitalize(
        activeChat.otherUser.lastName
      )}`;
      info = 'Account Manager';
      avatar = activeChat.otherUser.avatar;
    }
  } else {
    title = `${capitalize(otherUser.firstName)} ${capitalize(
      otherUser.lastName
    )}`;
    info = 'Account Manager';
  }

  return (
    <div className="conversation__header">
      <Avatar size="large" image={avatar} />
      <div className="conversation__title">
        <strong>{title}</strong>
        <span>{info}</span>
      </div>
      <i className="fas fa-times" onClick={() => setOtherUser(null)} />
    </div>
  );
};

ConversationHeader.propTypes = {
  context: PropTypes.object.isRequired
};

export default withChatContext(ConversationHeader);
