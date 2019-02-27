import React, { Component } from 'react';
import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationMsgBox from './ConversationMsgBox';
import './Conversation.scss';
// testing
import firebase from '../../../../firebase';

// const Conversation = () => (
//   <div className="conversation">
//     <ConversationHeader />
//     <ConversationBody />
//     <ConversationMsgBox />
//   </div>
// );

// lw7EHSp12goiesEO8tpS

class Conversation extends Component {
  componentDidMount() {
    firebase.listenForMessages('lw7EHSp12goiesEO8tpS', doc => {
      console.log('doc changed');
      console.log(doc.data());
    });
  }

  render() {
    return (
      <div className="conversation">
        <ConversationHeader />
        <ConversationBody />
        <ConversationMsgBox />
      </div>
    );
  }
}

export default Conversation;
