import React, { Fragment } from 'react';
import moment from 'moment';
import Avatar from '@common/Avatar';

const MessageContent = ({ text, time, pos }) => (
  <div className="message__content">
    <div className={`message__text message__text--${pos}`}>{text}</div>
    <span className={`message__time message__time--${pos}`}>
      {moment(time).calendar()}
    </span>
  </div>
);

const Message = ({ msg, position }) => {
  const { avatar, text, time } = msg;

  return (
    <div className="message">
      {position === 'left' ? (
        <Fragment>
          <Avatar image={avatar} size="small" />
          <MessageContent text={text} pos={position} time={time} />
        </Fragment>
      ) : (
        <Fragment>
          <MessageContent text={text} pos={position} time={time} />
          <Avatar image={msg.avatar} size="small" />
        </Fragment>
      )}
    </div>
  );
};

export default Message;
