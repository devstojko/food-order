import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withChatContext } from '../chatContext/withChatContext';
import capitalize from '@helpers/capitalize';
import ListItem from './ListItem';

const UserList = ({ context, authUser, toggleSidebar }) => {
  const { users, setOtherUser } = context;

  return (
    <div>
      <h3 className="chat-sidebar__title">
        <FormattedMessage
          id="startNewChat"
          defaultMessage="Start New Conversation"
        />
      </h3>
      {users.length > 0 ? (
        users.map(user => {
          const username = `${capitalize(user.firstName)} ${capitalize(
            user.lastName
          )} ${
            authUser.id === user.id ? (
              <FormattedMessage id="you" defaultMessage="(you)" />
            ) : (
              ''
            )
          }`;

          return (
            <ListItem
              key={user.id}
              avatar={user.avatar}
              username={username}
              onItemClick={() => {
                setOtherUser(user);
                toggleSidebar();
              }}
            />
          );
        })
      ) : (
        <div className="info-msg">
          <FormattedMessage
            id="noUsersFound"
            defaultMessage="No users with that username"
          />
        </div>
      )}
    </div>
  );
};

UserList.propTypes = {
  context: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(withChatContext(UserList));
