import React from 'react';
import ListItem from './ListItem';

const UserList = ({ users, setOtherUser }) => (
  <div className="chat__list">
    <h3>Start New Conversations</h3>
    {users.map(user => (
      <ListItem
        key={user.id}
        id={user.id}
        username={`${user.firstName} ${user.lastName}`}
        onItemClick={() => setOtherUser(user)}
      />
    ))}
  </div>
);

export default UserList;
