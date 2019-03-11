import React, { Fragment } from 'react';
import { Consumer } from '../chatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const ChatList = () => (
  <Consumer>
    {({ myChats, setActiveChat }) => {
      const groupChats = myChats.filter(c => c.groupName);
      const privateChats = myChats.filter(c => !c.groupName);

      return (
        <div>
          <h3 className="chat-sidebar__title">Group Conversations</h3>
          {groupChats.length > 0 ? (
            <Fragment>
              {groupChats.map(c => (
                <ListItem
                  key={c.id}
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
    }}
  </Consumer>
);

export default ChatList;
