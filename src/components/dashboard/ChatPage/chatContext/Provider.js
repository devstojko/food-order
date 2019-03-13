import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '@fb';
import debounce from '@helpers/debounce';
import GroupChatModal from '../GroupChatModal';

export const ChatContext = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      myChats: [],
      users: [],
      activeChat: null,
      otherUser: null,
      showModal: false
    };
  }

  // componentDidMount() {
  //   const authUserID = this.props.authUser.id;

  //   this.listener = firebase.fetchMyChats(authUserID).onSnapshot(snapshot => {
  //     this.setState({ myChats: [] });
  //     snapshot.forEach(doc => {
  //       const chat = { id: doc.id };
  //       const data = doc.data();

  //       if (data.groupName) {
  //         // if chat is group chat, attach group name to chat
  //         chat.groupName = data.groupName;
  //         chat.participants = data.participants;
  //         chat.avatar = data.avatar;
  //         this.setState({ myChats: [...this.state.myChats, chat] });
  //       } else {
  //         // find other user and attach his data to chat
  //         const otherUserRef =
  //           data.participants[0].id === authUserID
  //             ? data.participants[1]
  //             : data.participants[0];

  //         otherUserRef.get().then(user => {
  //           chat.otherUser = {
  //             id: user.id,
  //             ...user.data()
  //           };

  //           this.setState({ myChats: [...this.state.myChats, chat] });
  //         });
  //       }
  //     });
  //   });
  // }

  // handleSearchChange(e) {
  //   this.setState({ searchTerm: e.target.value }, () => {
  //     this.getUsers(this.state.searchTerm);
  //   });
  // }

  // getUsers(term) {
  //   this.setState({ users: [] });
  //   firebase
  //     .fetchUsersByName(term.toLowerCase())
  //     .then(snapshots => {
  //       if (!snapshots.empty) {
  //         snapshots.forEach(u => {
  //           const privateChats = this.state.myChats.filter(c => !c.groupName);
  //           // add user to search results only if we don't have a private chat
  //           if (!privateChats.find(c => c.otherUser.id === u.id)) {
  //             const user = { id: u.id, ...u.data() };
  //             this.setState({ users: [...this.state.users, user] });
  //           }
  //         });
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  // setOtherUser(user) {
  //   this.setState({
  //     otherUser: user,
  //     activeChat: null
  //   });
  // }

  // setActiveChat(chat) {
  //   this.setState({
  //     activeChat: chat,
  //     otherUser: null
  //   });
  // }

  // handleChatCreate() {
  //   this.setState({
  //     searchTerm: '',
  //     otherUser: null
  //   });
  // }

  // toggleModal() {
  //   this.setState({ showModal: !this.state.showModal });
  // }

  // componentWillUnmount() {
  //   this.listener();
  // }

  render() {
    const contextValue = {
      ...this.state
      // getUsers: debounce(this.getUsers.bind(this), 300),
      // setOtherUser: this.setOtherUser.bind(this),
      // setActiveChat: this.setActiveChat.bind(this),
      // handleSearchChange: this.handleSearchChange.bind(this),
      // handleChatCreate: this.handleChatCreate.bind(this),
      // toggleModal: this.toggleModal.bind(this)
    };

    return (
      <ChatContext.Provider value={contextValue}>
        {this.props.children}

        {/* {this.state.showModal && (
          <GroupChatModal handleClose={this.toggleModal.bind(this)} />
        )} */}
      </ChatContext.Provider>
    );
  }
}

Provider.propTypes = {
  authUser: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(Provider);
