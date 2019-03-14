import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '@fb';
import { withChatContext } from '../chatContext/withChatContext';

class ConversationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgText: '',
      myAvatar: null
    };

    this.startConversation = this.startConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    firebase.fetchUser(this.props.authUser.id).then(doc => {
      this.setState({ myAvatar: doc.data().avatar });
    });
  }

  startConversation() {
    const user1 = firebase.userReference(this.props.authUser.id);
    const user2 = firebase.userReference(this.props.context.otherUser.id);

    return firebase.createChat(user1, user2);
  }

  sendMessage(id) {
    const message = {
      text: this.state.msgText,
      sender: this.props.authUser.id,
      avatar: this.state.myAvatar,
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

    if (this.props.context.otherUser) {
      this.startConversation()
        .then(newChat => {
          // chat was created in firestore
          newChat.get().then(doc => {
            const chat = { id: newChat.id };
            const data = doc.data();

            const otherUserRef =
              data.participants[0].id === this.props.authUser.id
                ? data.participants[1]
                : data.participants[0];

            // attach other user data to the active chat
            otherUserRef.get().then(user => {
              chat.otherUser = {
                id: user.id,
                ...user.data()
              };

              this.props.context.setActiveChat(chat);
              this.sendMessage(chat.id);
              this.props.context.handleChatCreate();
            });
          });
        })
        .catch(err => console.log(err));
    } else {
      this.sendMessage(this.props.context.activeChat.id);
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
  context: PropTypes.object.isRequired
};

export default withChatContext(ConversationForm);
