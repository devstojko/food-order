import React from 'react';
import { Consumer } from '../chatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const UserList = () => (
  <Consumer>
    {({ users, setOtherUser }) => (
      <div>
        <h3 className="chat-sidebar__title">Start New Conversations</h3>
        {users.length > 0 ? (
          users.map(user => (
            <ListItem
              key={user.id}
              username={`${capitalize(user.firstName)} ${capitalize(
                user.lastName
              )}`}
              onItemClick={() => setOtherUser(user)}
            />
          ))
        ) : (
          <div className="info-msg">No users with that username</div>
        )}
      </div>
    )}
  </Consumer>
);

export default UserList;
