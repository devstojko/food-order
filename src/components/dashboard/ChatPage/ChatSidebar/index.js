import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import Search from '@common/Search';
import ChatList from './ChatList';
import UserList from './UserList';
import './ChatSidebar.scss';

const ChatSidebar = ({ context, toggleSidebar }) => {
  const { searchTerm, handleSearchChange } = context;

  return (
    <Fragment>
      <div className="chat-sidebar">
        <div className="chat-sidebar__search">
          <Search
            value={searchTerm}
            handleChange={handleSearchChange}
            placeholder="Search for users"
          />
        </div>
        <div className="chat-sidebar__list">
          {searchTerm ? (
            <UserList toggleSidebar={toggleSidebar} />
          ) : (
            <ChatList toggleSidebar={toggleSidebar} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

ChatSidebar.propTypes = {
  context: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

export default withChatContext(ChatSidebar);
