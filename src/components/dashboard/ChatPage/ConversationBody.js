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
    // set listener for selected conversation messages
    firebase
      .conversationMessages(this.props.activeChatID)
      .onSnapshot(snapshot => {
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
              position={msg.sender === authUser.id ? 'right' : 'left'}
            />
          );
        })}
      </div>
    );
  }
}

export default ConversationBody;
