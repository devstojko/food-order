import React, { Fragment } from 'react';
import { Consumer } from '../chatContext';
import Search from '@common/Search';
import Modal from '@common/Modal';
import ChatList from './ChatList';
import UserList from './UserList';
import './ChatSidebar.scss';

const ChatSidebar = () => (
  <Consumer>
    {({ searchTerm, handleSearchChange, showModal, toggleModal }) => (
      <Fragment>
        <div className="chat-sidebar">
          <div className="chat-sidebar__search">
            <Search
              value={searchTerm}
              handleChange={handleSearchChange}
              placeholder="Search Message or Name..."
            />
            <button onClick={toggleModal}>Testing</button>
          </div>
          <div className="chat-sidebar__list">
            <ChatList />
            {searchTerm && <UserList />}
          </div>
        </div>

        {showModal && (
          <Modal title="Create Group Chat" onClose={toggleModal}>
            Dummy Modal Content
          </Modal>
        )}
      </Fragment>
    )}
  </Consumer>
);

export default ChatSidebar;
