import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const ConversationBody = ({ messages, authUser }) => (
  <div className="conversation__body">
    {messages.map(msg => {
      return (
        <Message
          key={msg.id}
          msg={msg}
          position={msg.sender === authUser.id ? 'right' : 'left'}
        />
      );
    })}
  </div>
);

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ConversationBody);
