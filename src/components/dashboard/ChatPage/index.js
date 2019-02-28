import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '@common/Search';
import SidebarList from './SidebarList';
import Conversation from './Conversation';
import firebase from '@fb';
import './ChatPage.scss';

// debounce
const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      activeChat: null,
      chats: [],
      users: [{ id: 1, data: 'asdf' }, { id: 2, data: 'asdf' }], // random data for testing
      drugiUser: { id: '123', email: 'nekiuser@gmail.com' } // temp
    };

    this.getUsers = debounce(this.getUsers.bind(this), 200);
    this.handleChange = this.handleChange.bind(this);
    // test
    this.startConversation = this.startConversation.bind(this);

    this.setDrugiUser = this.setDrugiUser.bind(this);
    this.setActiveChat = this.setActiveChat.bind(this);
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

  setDrugiUser(drugiUser) {
    this.setState({ drugiUser });
  }

  setActiveChat(id) {
    this.setState({ activeChat: id });
  }

  // testing
  startConversation() {
    firebase.createConversation(this.props.authUser, this.state.drugiUser);
  }

  render() {
    const { searchTerm, chats, users, activeChat } = this.state;

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
            <SidebarList
              title="conversations"
              items={chats}
              funcOnItems={this.setActiveChat}
            />
            {searchTerm && (
              <SidebarList
                title="users"
                items={users}
                funcOnItems={this.setDrugiUser}
              />
            )}
          </div>
        </div>
        <div className="chat__main-area">
          {activeChat ? (
            <Conversation withUser={this.state.drugiUser} />
          ) : (
            <button onClick={this.startConversation}>
              Start Conversation with this person
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(ChatPage);
