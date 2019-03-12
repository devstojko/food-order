import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const ChatList = ({ context }) => {
  const { myChats, setActiveChat, toggleModal } = context;
  const groupChats = myChats.filter(c => c.groupName);
  const privateChats = myChats.filter(c => !c.groupName);

  return (
    <div>
      <h3 className="chat-sidebar__title">
        Group Conversations
        <i className="fas fa-plus" onClick={toggleModal} />
      </h3>
      {groupChats.length > 0 ? (
        <Fragment>
          {groupChats.map(c => (
            <ListItem
              key={c.id}
              avatar={c.avatar}
              username={c.groupName}
              onItemClick={() => setActiveChat(c)}
            />
          ))}
        </Fragment>
      ) : (
        <div className="info-msg">No conversations</div>
      )}

      <h3 className="chat-sidebar__title">Private Conversations</h3>
      {privateChats.length > 0 ? (
        <Fragment>
          {privateChats.map(c => (
            <ListItem
              key={c.id}
              username={`${capitalize(c.otherUser.firstName)} ${capitalize(
                c.otherUser.lastName
              )}`}
              onItemClick={() => setActiveChat(c)}
            />
          ))}
        </Fragment>
      ) : (
        <div className="info-msg">No conversations</div>
      )}
    </div>
  );
};

ChatList.propTypes = {
  context: PropTypes.object.isRequired
};

export default withChatContext(ChatList);
