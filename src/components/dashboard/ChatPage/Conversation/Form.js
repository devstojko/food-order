import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '@fb';
import { Consumer } from '../chatContext';

class ConversationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgText: ''
    };

    this.startConversation = this.startConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  startConversation() {
    const user1 = firebase.userReference(this.props.authUser.id);
    const user2 = firebase.userReference(this.props.otherUser.id);

    return firebase.createChat(user1, user2);
  }

  sendMessage(id) {
    const message = {
      text: this.state.msgText,
      sender: this.props.authUser.id,
      time: Date.now()
    };

    firebase.sendMessage(id, message);
    this.setState({ msgText: '' });
  }

  handleChange(e) {
    this.setState({ msgText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // REFACTOR THIS LATER
    if (this.props.otherUser) {
      this.startConversation()
        .then(newChat => {
          newChat.get().then(doc => {
            console.log(doc.data());
            const newChatData = doc.data();

            const chat = { id: newChat.id };
            const userRef =
              newChatData.participants[0].id ===
              firebase.userReference(this.props.authUser.id).id
                ? newChatData.participants[1]
                : newChatData.participants[0];

            // get user data from reference
            userRef.get().then(user => {
              chat.otherUser = {
                id: user.id,
                ...user.data()
              };

              this.props.setActiveChat(chat);
              this.sendMessage(chat.id);
              this.props.handleChatCreate();
            });
          });
        })
        .catch(err => console.log(err));
    } else {
      this.sendMessage(this.props.activeChat.id);
    }
  }

  render() {
    return (
      <form className="conversation__form" onSubmit={this.handleSubmit}>
        <input
          value={this.state.msgText}
          onChange={this.handleChange}
          placeholder="Type your message here..."
          required
        />
        <div className="buttons">
          <i className="fas fa-paperclip" />
          <i className="fas fa-grin" />
          <button type="submit">
            <i className="fas fa-chevron-circle-right" />
          </button>
        </div>
      </form>
    );
  }
}

ConversationForm.propTypes = {
  authUser: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
  activeChat: PropTypes.object,
  setActiveChat: PropTypes.func.isRequired,
  handleChatCreate: PropTypes.func.isRequired
};

const ConversationFormWithContext = props => (
  <Consumer>
    {({ otherUser, activeChat, setActiveChat, handleChatCreate }) => (
      <ConversationForm
        otherUser={otherUser}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        handleChatCreate={handleChatCreate}
        {...props}
      />
    )}
  </Consumer>
);

export default ConversationFormWithContext;
