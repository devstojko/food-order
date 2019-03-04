import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '@common/Search';
import UserList from './UserList';
import ChatList from './ChatList';
import ConversationBody from './ConversationBody';
import ConversationForm from './ConversationForm';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import debounce from '@helpers/debounce';
import './ChatPage.scss';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      activeChat: null,
      otherUser: null,
      chats: [],
      users: []
    };

    this.getUsers = debounce(this.getUsers.bind(this), 200);
    this.handleChange = this.handleChange.bind(this);
    this.setOtherUser = this.setOtherUser.bind(this);
    this.setActiveChat = this.setActiveChat.bind(this);
  }

  componentDidMount() {
    const chats = firebase.fetchMyConversations(this.props.authUser.id);

    // set listeners for chats that user participates in REFACTOR
    chats.forEach((chat, i) => {
      const otherUserSelector = `user${i === 0 ? '1' : '0'}`;

      chat.onSnapshot(snapshot => {
        snapshot.forEach(c => {
          this.setState({ chats: [] });
          const chat = { id: c.id };
          c.data()
            [otherUserSelector].get()
            .then(u => {
              chat.otherUser = {
                id: u.id,
                ...u.data()
              };
              this.setState({ chats: [...this.state.chats, chat] });
            });
        });
      });
    });
  }

  getUsers(term) {
    this.setState({ users: [] });
    firebase
      .fetchUsersByName(term)
      .then(snapshots => {
        // check if result is empty and render based on that
        console.log(snapshots.empty);

        snapshots.forEach(u => {
          const user = { id: u.id, ...u.data() };
          this.setState({ users: [...this.state.users, user] });
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      this.getUsers(this.state.searchTerm);
    });
  }

  setOtherUser(otherUser) {
    this.setState({
      otherUser,
      activeChat: null
    });
  }

  setActiveChat(id, otherUser) {
    this.setState({ activeChat: id, otherUser });
  }

  render() {
    const { searchTerm, chats, users, activeChat, otherUser } = this.state;

    return (
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__search">
            <Search
              value={searchTerm}
              handleChange={this.handleChange}
              placeholder="Search Message or Name..."
            />
          </div>
          <div className="chat__list">
            <ChatList chats={chats} setActiveChat={this.setActiveChat} />

            {searchTerm && (
              <UserList users={users} setOtherUser={this.setOtherUser} />
            )}
          </div>
        </div>
        <div className="chat__main-area">
          {otherUser && (
            <div className="conversation">
              <div className="conversation__header">
                <Avatar size="large" />
                <div className="conversation__user">
                  <strong>
                    {otherUser.firstName} {otherUser.lastName}
                  </strong>
                  <span>Account Manager</span>
                </div>
                <i className="fas fa-times" />
              </div>
              <ConversationBody
                activeChatID={activeChat}
                authUser={this.props.authUser}
              />
              <ConversationForm
                activeChatID={activeChat}
                authUser={this.props.authUser}
                otherUser={this.state.otherUser}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ChatPage);
