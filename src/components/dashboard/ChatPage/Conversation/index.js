import React, { Component } from 'react';
import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationForm from './ConversationForm';
import firebase from 'fb';
import './Conversation.scss';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    // change the ID from static
    firebase.messagesCollection('lw7EHSp12goiesEO8tpS').onSnapshot(snapshot => {
      this.setState({ messages: [] });
      snapshot.forEach(doc => {
        const msg = { id: doc.id, ...doc.data() };
        this.setState({ messages: [...this.state.messages, msg] });
      });
    });
  }

  render() {
    return (
      <div className="conversation">
        <ConversationHeader />
        <ConversationBody messages={this.state.messages} />
        <ConversationForm />
      </div>
    );
  }
}

export default Conversation;
