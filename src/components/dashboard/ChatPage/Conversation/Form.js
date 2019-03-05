import React, { Component } from 'react';
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

    return firebase.createConversation(user1, user2);
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
    // send message to firestore
    if (this.state.msgText.length > 0) {
      if (!this.props.activeChatID) {
        this.startConversation()
          .then(newConv => {
            this.sendMessage(newConv.id);
            this.props.setActiveChat(newConv.id, this.props.otherUser);
            this.props.clearSearch();
          })
          .catch(err => console.log(err));
      } else {
        this.sendMessage(this.props.activeChatID);
      }
    }
  }

  render() {
    return (
      <form className="conversation__form" onSubmit={this.handleSubmit}>
        <textarea
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

const ConversationFormWithContext = props => (
  <Consumer>
    {({ otherUser, activeChatID, setActiveChat, clearSearch }) => (
      <ConversationForm
        otherUser={otherUser}
        activeChatID={activeChatID}
        setActiveChat={setActiveChat}
        clearSearch={clearSearch}
        {...props}
      />
    )}
  </Consumer>
);

export default ConversationFormWithContext;
