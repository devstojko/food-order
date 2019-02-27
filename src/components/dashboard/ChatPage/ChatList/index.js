import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConversations } from 'actions/conversationActions';
import Avatar from 'common/Avatar';
import './ChatList.scss';

const ChatListItem = () => (
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
  componentDidMount() {
    this.props.getConversations();
  }

  render() {
    return (
      <div className="chat-list">
        {this.props.conversations.map(c => (
          <ChatListItem key={c.id} chat={c} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ conversations }) => ({ conversations });

export default connect(
  mapStateToProps,
  { getConversations }
)(ChatList);
