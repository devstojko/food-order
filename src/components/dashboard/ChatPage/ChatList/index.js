import React, { Component } from 'react';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import './ChatList.scss';

const ChatListItem = ({ chat }) => (
  <div className="chat-item">
    <Avatar />
    <div className="chat-item__text">
      <strong>User Name</strong>
      <span>Last message text</span>
    </div>
    <div className="chat-item__time">13 min ago</div>
  </div>
);

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: []
    };
  }

  componentDidMount() {
    firebase.conversations().onSnapshot(snapshot => {
      this.setState({ chats: [] });
      snapshot.forEach(doc => {
        const chat = { id: doc.id, ...doc.data() };
        this.setState({ chats: [...this.state.chats, chat] });
      });
    });
  }

  render() {
    return (
      <div className="chat-list">
        {this.state.chats.map(c => (
          <ChatListItem key={c.id} chat={c} />
        ))}
      </div>
    );
  }
}

export default ChatList;
