import React from 'react';
import ConversationHeader from './Header';
import ConversationBody from './Body';
import ConversationForm from './Form';
import './Conversation.scss';

const Conversation = () => (
  <div className="conversation">
    <ConversationHeader />
    <ConversationBody />
    <ConversationForm />
  </div>
);

export default Conversation;
