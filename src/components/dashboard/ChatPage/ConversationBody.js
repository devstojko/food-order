import React, { Component } from 'react';
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
    this.setMessagesListener(this.props.activeChatID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeChatID !== prevProps.activeChatID) {
      this.setMessagesListener(this.props.activeChatID);
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
        {this.state.messages.map(msg => {
          return (
            <Message
              key={msg.id}
              msg={msg}
              position={
                msg.sender === this.props.authUser.id ? 'right' : 'left'
              }
            />
          );
        })}
      </div>
    );
  }
}

export default ConversationBody;
