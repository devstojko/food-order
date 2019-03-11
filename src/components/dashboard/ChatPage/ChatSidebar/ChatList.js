import React from 'react';
import { Consumer } from '../chatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const ChatList = () => (
  <Consumer>
    {({ myChats, setActiveChat }) => (
      <div>
        <h3 className="chat-sidebar__title">Your Conversations</h3>
        {myChats.length > 0 ? (
          myChats.map(chat => {
            const username = chat.groupName
              ? chat.groupName
              : `${capitalize(chat.otherUser.firstName)} ${capitalize(
                  chat.otherUser.lastName
                )}`;

            return (
              <ListItem
                key={chat.id}
                username={username}
                onItemClick={() => setActiveChat(chat)}
              />
            );
          })
        ) : (
          <div className="info-msg">No conversations</div>
        )}
      </div>
    )}
  </Consumer>
);

export default ChatList;
