import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '@fb';
import debounce from '@helpers/debounce';

const ChatContext = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      myChats: [],
      users: [],
      activeChatID: null,
      otherUser: null
    };
  }

  // componentDidMount() {
  //   const chats = firebase.fetchMyConversations(this.props.authUser.id);

  //   // set listeners for chats that user participates in REFACTOR
  //   chats.forEach((chat, i) => {
  //     const otherUserSelector = `user${i === 0 ? '1' : '0'}`;

  //     chat.onSnapshot(snapshot => {
  //       this.setState({ myChats: [] });
  //       snapshot.forEach(c => {
  //         // this.setState({ chats: [] });
  //         const chat = { id: c.id };
  //         c.data()
  //           [otherUserSelector].get()
  //           .then(u => {
  //             chat.otherUser = {
  //               id: u.id,
  //               ...u.data()
  //             };
  //             this.setState({ myChats: [...this.state.myChats, chat] });
  //           });
  //       });
  //     });
  //   });
  // }

  componentDidMount() {
    firebase
      .fetchMyConversations(this.props.authUser.id)
      .onSnapshot(snapshot => {
        this.setState({ myChats: [] });
        snapshot.forEach(doc => {
          const chat = { id: doc.id };
          // get reference to other user from database
          const userRef =
            doc.data().participants[0].id ===
            firebase.userReference(this.props.authUser.id).id
              ? doc.data().participants[1]
              : doc.data().participants[0];

          // get user data from reference
          userRef.get().then(user => {
            chat.otherUser = {
              id: user.id,
              ...user.data()
            };

            this.setState({
              ...this.state,
              myChats: [...this.state.myChats, chat]
            });
          });
        });
      });
  }

  handleSearchChange(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      this.getUsers(this.state.searchTerm);
    });
  }

  getUsers(term) {
    this.setState({ users: [] });
    firebase
      .fetchUsersByName(term)
      .then(snapshots => {
        if (!snapshots.empty) {
          snapshots.forEach(u => {
            if (!this.state.myChats.find(c => c.otherUser.id === u.id)) {
              const user = { id: u.id, ...u.data() };
              this.setState({ users: [...this.state.users, user] });
            }
          });
        }
      })
      .catch(err => console.log(err));
  }

  setOtherUser(user) {
    this.setState({
      otherUser: user,
      activeChatID: null
    });
  }

  setActiveChat(id, otherUser) {
    this.setState({
      activeChatID: id,
      otherUser
    });
  }

  clearSearch() {
    this.setState({
      searchTerm: ''
    });
  }

  render() {
    const contextValue = {
      ...this.state,
      getUsers: debounce(this.getUsers.bind(this), 300),
      setOtherUser: this.setOtherUser.bind(this),
      setActiveChat: this.setActiveChat.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
      clearSearch: this.clearSearch.bind(this)
    };

    return (
      <ChatContext.Provider value={contextValue}>
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(Provider);

export const Consumer = ChatContext.Consumer;
