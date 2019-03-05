import React from 'react';
import { Consumer } from '../chatContext';
import Search from '@common/Search';
import ChatList from './ChatList';
import UserList from './UserList';
import './ChatSidebar.scss';

const ChatSidebar = () => (
  <Consumer>
    {({ searchTerm, handleSearchChange }) => (
      <div className="chat-sidebar">
        <div className="chat-sidebar__search">
          <Search
            value={searchTerm}
            handleChange={handleSearchChange}
            placeholder="Search Message or Name..."
          />
        </div>
        <div className="chat-sidebar__list">
          <ChatList />
          {searchTerm && <UserList />}
        </div>
      </div>
    )}
  </Consumer>
);

export default ChatSidebar;
