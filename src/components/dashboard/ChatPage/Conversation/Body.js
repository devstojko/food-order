import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withChatContext } from '../chatContext/withChatContext';
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
    const { activeChat } = this.props.context;
    if (activeChat) {
      this.setMessagesListener(activeChat.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { activeChat } = this.props.context;
    const currentChatID = activeChat ? activeChat.id : null;
    const prevChatID = prevProps.context.activeChat
      ? prevProps.context.activeChat.id
      : null;

    if (currentChatID && currentChatID !== prevChatID) {
      this.setMessagesListener(currentChatID);
    }
  }

  setMessagesListener(chatID) {
    firebase.chatMessages(chatID).onSnapshot(snapshot => {
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
        {this.props.context.activeChat && this.state.messages.length > 0 ? (
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
            Start a conversation by sending a message
          </div>
        )}
      </div>
    );
  }
}

ConversationBody.propTypes = {
  authUser: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

export default withChatContext(ConversationBody);
