import React from 'react';

const Message = ({ msg, position }) => (
  <div className="message">
    <div className={`message__text message__text--${position}`}>{msg.text}</div>
    <span className="message__time">11:03 pm</span>
  </div>
);

export default Message;
