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
    if (this.props.activeChat) {
      this.setMessagesListener(this.props.activeChat.id);
    }
  }

  componentDidUpdate(prevProps) {
    const currentChatID = this.props.activeChat
      ? this.props.activeChat.id
      : null;
    const prevChatID = prevProps.activeChat ? prevProps.activeChat.id : null;

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
        {this.props.activeChat && this.state.messages.length > 0 ? (
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
  activeChat: PropTypes.object
};

const ConversationBodyWithContext = props => (
  <Consumer>
    {({ activeChat }) => (
      <ConversationBody activeChat={activeChat} {...props} />
    )}
  </Consumer>
);

export default ConversationBodyWithContext;
