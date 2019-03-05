import React, { Component } from 'react';
import { Consumer } from '../chatContext';
import Message from './Message';
import firebase from '@fb';

class ConversationBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
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
      });
    });
  }

  render() {
    return (
      <div className="conversation__body">
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
          <h1>Say something to start a conversation</h1>
        )}
      </div>
    );
  }
}

const ConversationBodyWithContext = props => (
  <Consumer>
    {({ activeChatID }) => (
      <ConversationBody activeChatID={activeChatID} {...props} />
    )}
  </Consumer>
);

export default ConversationBodyWithContext;
