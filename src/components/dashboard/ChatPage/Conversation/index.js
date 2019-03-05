import React from 'react';
import { connect } from 'react-redux';
import { Consumer } from '../chatContext';
import ConversationHeader from './Header';
import ConversationBody from './Body';
import ConversationForm from './Form';
import './Conversation.scss';

const Conversation = ({ authUser }) => (
  <Consumer>
    {({ otherUser }) =>
      otherUser ? (
        <div className="conversation">
          <ConversationHeader
            username={`${otherUser.firstName} ${otherUser.lastName}`}
          />
          <ConversationBody authUser={authUser} />
          <ConversationForm authUser={authUser} />
        </div>
      ) : (
        <h1>no content</h1>
      )
    }
  </Consumer>
);

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(Conversation);
