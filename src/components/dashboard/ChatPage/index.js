import React, { Component } from 'react';
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
      users: [{ id: 1, data: 'asdf' }, { id: 2, data: 'asdf' }] // random data for testing
    };

    this.getUsers = debounce(this.getUsers.bind(this), 200);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { searchTerm, chats, users } = this.state;

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
            <SidebarList title="conversations" items={chats} />
            {searchTerm && <SidebarList title="users" items={users} />}
          </div>
        </div>
        <div className="chat__main-area">
          <Conversation />
        </div>
      </div>
    );
  }
}

export default ChatPage;
