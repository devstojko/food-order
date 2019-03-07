import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../chatContext';
import Message from './Message';
import firebase from '@fb';

class ConversationBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.conversationBodyRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.activeChatID) {
      this.setMessagesListener(this.props.activeChatID);
    }
  }

  componentDidUpdate(prevProps) {
    const newChatID = this.props.activeChatID;
    if (newChatID && newChatID !== prevProps.activeChatID) {
      this.setMessagesListener(newChatID);
    }
  }

  setMessagesListener(chatID) {
    firebase.conversationMessages(chatID).onSnapshot(snapshot => {
      this.setState({ messages: [] });
      snapshot.forEach(doc => {
        const msg = { id: doc.id, ...doc.data() };
        this.setState({ messages: [...this.state.messages, msg] });
        this.conversationBodyRef.current.scrollTop = this.conversationBodyRef.current.scrollHeight;
      });
    });
  }

  render() {
    return (
      <div className="conversation__body" ref={this.conversationBodyRef}>
        {this.props.activeChatID ? (
          this.state.messages.map(msg => {
            return (
              <Message
                key={msg.id}
                msg={msg}
                position={
                  msg.sender === this.props.authUser.id ? 'right' : 'left'
                }
              />
            );
          })
        ) : (
          <div className="info-msg info-msg--big">
            Start a conversation with this person
          </div>
        )}
      </div>
    );
  }
}

ConversationBody.propTypes = {
  authUser: PropTypes.object.isRequired,
  activeChatID: PropTypes.string
};

const ConversationBodyWithContext = props => (
  <Consumer>
    {({ activeChatID }) => (
      <ConversationBody activeChatID={activeChatID} {...props} />
    )}
  </Consumer>
);

export default ConversationBodyWithContext;
