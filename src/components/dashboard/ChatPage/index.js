import React, { Component } from 'react';
import Search from '@common/Search';
import ChatList from './ChatList';
import Conversation from './Conversation';
import firebase from '@fb';
import './ChatPage.scss';

const UserItem = ({ user }) => (
  <div style={{ border: '1px solid black' }}>
    {`${user.firstName} ${user.lastName}`}
  </div>
);

// export const debounce = (fn, delay) => {
//   let timer = null;
//   return function(...args) {
//     const context = this;
//     timer && clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(context, args);
//     }, delay);
//   };
// };

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      users: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // testing
    // console.log(e.target.value);
    // this.setState({ searchValue: e.target.value }, () => {
    // console.log('asdf');
    // firebase
    //   .fetchUsersByName(this.state.searchValue)
    //   .then(users => {
    //     users.forEach(u => console.log(u.data()));
    //     // this.setState({ users });
    //   })
    //   .catch(err => console.log(err));
    // });
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__search">
            <Search
              value={searchValue}
              handleChange={this.handleChange}
              placeholder="Search Message or Name..."
            />
          </div>
          <ChatList />
          {/* TESTING */}
          {searchValue && (
            <div>
              {this.state.users.map(u => (
                <UserItem key={u} user={u} />
              ))}
            </div>
          )}
        </div>
        <div className="chat__main-area">
          <Conversation />
        </div>
      </div>
    );
  }
}

export default ChatPage;
