import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '@fb';
import debounce from '@helpers/debounce';
import GroupChatModal from './GroupChatModal';

const ChatContext = React.createContext();

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

  componentDidMount() {
    firebase.fetchMyChats(this.props.authUser.id).onSnapshot(snapshot => {
      this.setState({ myChats: [] });
      snapshot.forEach(doc => {
        const chat = { id: doc.id };
        // REFACTOR THIS LATER
        // get reference to other user from database]
        if (doc.data().groupName) {
          chat.groupName = doc.data().groupName;
        }

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
            // if (!this.state.myChats.find(c => c.otherUser.id === u.id)) {
            const user = { id: u.id, ...u.data() };
            this.setState({ users: [...this.state.users, user] });
            // }
          });
        }
      })
      .catch(err => console.log(err));
  }

  setOtherUser(user) {
    this.setState({
      otherUser: user,
      activeChat: null
    });
  }

  setActiveChat(chat) {
    this.setState({
      activeChat: chat,
      otherUser: null
    });
  }

  handleChatCreate() {
    this.setState({
      searchTerm: '',
      otherUser: null
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const contextValue = {
      ...this.state,
      getUsers: debounce(this.getUsers.bind(this), 300),
      setOtherUser: this.setOtherUser.bind(this),
      setActiveChat: this.setActiveChat.bind(this),
      handleSearchChange: this.handleSearchChange.bind(this),
      handleChatCreate: this.handleChatCreate.bind(this),
      toggleModal: this.toggleModal.bind(this)
    };

    return (
      <ChatContext.Provider value={contextValue}>
        {this.props.children}

        {this.state.showModal && (
          <GroupChatModal handleClose={this.toggleModal.bind(this)} />
        )}
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

export const Consumer = ChatContext.Consumer;
