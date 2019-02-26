import React from 'react';
import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationMsgBox from './ConversationMsgBox';
import './Conversation.scss';

const Conversation = () => (
  <div className="conversation">
    <ConversationHeader />
    <ConversationBody />
    <ConversationMsgBox />
  </div>
);

export default Conversation;
