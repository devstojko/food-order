import React from 'react';
import { Consumer } from '../chatContext';
import ListItem from './ListItem';

const ChatList = () => (
  <Consumer>
    {({ myChats, setActiveChat }) => (
      <div>
        <h3 className="chat-sidebar__title">Your Conversations</h3>
        {myChats.length > 0 ? (
          myChats.map(chat => {
            const username = chat.name
              ? chat.name
              : `${chat.otherUser.firstName} ${chat.otherUser.lastName}`;

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
