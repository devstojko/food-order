import React from 'react';
import SidebarListItem from './SidebarListItem';

const UserList = ({ users, onItemClick }) => (
  <div className="chat__list">
    <h3>Start New Conversations</h3>
    {users.map(user => (
      <SidebarListItem
        key={user.id}
        id={user.id}
        username={`${user.firstName} ${user.lastName}`}
        onItemClick={onItemClick}
      />
    ))}
  </div>
);

export default UserList;
