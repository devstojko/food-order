import React from 'react';
import { Consumer } from '../chatContext';
import ListItem from './ListItem';

const ChatList = () => (
  <Consumer>
    {({ myChats, setActiveChat }) => (
      <div>
        <h3 className="chat-sidebar__title">Your Conversations</h3>
        {myChats.length > 0 ? (
          myChats.map(chat => (
            <ListItem
              key={chat.id}
              username={`${chat.otherUser.firstName} ${
                chat.otherUser.lastName
              }`}
              onItemClick={() => setActiveChat(chat.id, chat.otherUser)}
            />
          ))
        ) : (
          <div className="info-msg">No conversations</div>
        )}
      </div>
    )}
  </Consumer>
);

export default ChatList;
