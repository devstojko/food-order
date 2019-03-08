import React, { Fragment } from 'react';
import { Consumer } from '../chatContext';
import Search from '@common/Search';
import ChatList from './ChatList';
import UserList from './UserList';
import './ChatSidebar.scss';

const ChatSidebar = () => (
  <Consumer>
    {({ searchTerm, handleSearchChange, toggleModal }) => (
      <Fragment>
        <div className="chat-sidebar">
          <div className="chat-sidebar__search">
            <Search
              value={searchTerm}
              handleChange={handleSearchChange}
              placeholder="Search for users"
            />
            <button onClick={toggleModal}>Testing</button>
          </div>
          <div className="chat-sidebar__list">
            <ChatList />
            {searchTerm && <UserList />}
          </div>
        </div>
      </Fragment>
    )}
  </Consumer>
);

export default ChatSidebar;
