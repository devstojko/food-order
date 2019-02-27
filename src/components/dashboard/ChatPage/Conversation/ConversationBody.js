import React from 'react';
import Message from './Message';

const ConversationBody = ({ messages }) => {
  console.log(messages);
  return (
    <div className="conversation__body">
      {messages.map(m => (
        <Message key={m.id} text={m.text} />
      ))}
    </div>
  );
};

export default ConversationBody;
