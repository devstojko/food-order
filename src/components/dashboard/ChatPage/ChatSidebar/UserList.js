import React from 'react';
import { Consumer } from '../chatContext';
import ListItem from './ListItem';

const UserList = ({ users, setOtherUser }) => (
  <Consumer>
    {({ users, setOtherUser }) => (
      <div className="chat__list">
        <h3>Start New Conversations</h3>
        {users.map(user => (
          <ListItem
            key={user.id}
            username={`${user.firstName} ${user.lastName}`}
            onItemClick={() => setOtherUser(user)}
          />
        ))}
      </div>
    )}
  </Consumer>
);

export default UserList;
