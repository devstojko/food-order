import React, { Component } from 'react';
import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationMsgBox from './ConversationMsgBox';
import './Conversation.scss';
import firebase from '../../../../firebase';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    // change from static id
    firebase.listenForMessages('lw7EHSp12goiesEO8tpS', doc => {
      const msg = { id: doc.id, ...doc.data() };
      console.log(msg);
      console.log(this.state.messages);
      this.setState({ messages: [...this.state.messages, msg] });
      // this.setState(state => {
      //   console.log(state);
      //   const updatedMessages = state.messages.push(msg);
      //   return { messages: updatedMessages };
      // });
    });
  }

  render() {
    return (
      <div className="conversation">
        <ConversationHeader />
        <ConversationBody messages={this.state.messages} />
        <ConversationMsgBox />
      </div>
    );
  }
}

export default Conversation;
