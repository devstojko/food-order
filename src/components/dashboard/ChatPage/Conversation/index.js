import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withChatContext } from '../chatContext/withChatContext';
import ConversationHeader from './Header';
import ConversationBody from './Body';
import ConversationForm from './Form';
import './Conversation.scss';

const Conversation = ({ authUser, context }) => {
  const { otherUser, activeChat } = context;

  if (otherUser || activeChat) {
    let headerTitle;
    if (activeChat) {
      headerTitle = activeChat.groupName
        ? activeChat.groupName
        : `${activeChat.otherUser.firstName} ${activeChat.otherUser.lastName}`;
    } else {
      headerTitle = `${otherUser.firstName} ${otherUser.lastName}`;
    }

    return (
      <div className="conversation">
        <ConversationHeader title={headerTitle} />
        <ConversationBody authUser={authUser} />
        <ConversationForm authUser={authUser} />
      </div>
    );
  } else {
    return (
      <div className="empty-conversation">
        <p>Start chatting with someone by sending him a nice message</p>
      </div>
    );
  }
};

Conversation.propTypes = {
  authUser: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(withChatContext(Conversation));
