import React from 'react';
import moment from 'moment';

const Message = ({ msg, position }) => (
  <div className="message">
    <div className={`message__text message__text--${position}`}>{msg.text}</div>
    <span className={`message__time message__time--${position}`}>
      {moment(msg.time).calendar()}
    </span>
  </div>
);

export default Message;
