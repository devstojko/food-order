import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import Search from '@common/Search';
import ChatList from './ChatList';
import UserList from './UserList';
import './ChatSidebar.scss';

const ChatSidebar = ({ context }) => {
  const { searchTerm, handleSearchChange, toggleModal } = context;

  return (
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
          {searchTerm ? <UserList /> : <ChatList />}
        </div>
      </div>
    </Fragment>
  );
};

ChatSidebar.propTypes = {
  context: PropTypes.object.isRequired
};

export default withChatContext(ChatSidebar);
