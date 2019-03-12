import React from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const UserList = ({ context }) => {
  const { users, setOtherUser } = context;

  return (
    <div>
      <h3 className="chat-sidebar__title">Start New Conversations</h3>
      {users.length > 0 ? (
        users.map(user => (
          <ListItem
            key={user.id}
            avatar={user.avatar}
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
  );
};

UserList.propTypes = {
  context: PropTypes.object.isRequired
};

export default withChatContext(UserList);
