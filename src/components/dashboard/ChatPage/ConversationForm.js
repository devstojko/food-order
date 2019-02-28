import React, { Component } from 'react';
import firebase from '@fb';

class ConversationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ msgText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // send message to firestore
    if (this.state.msgText.length > 0) {
      const message = {
        text: this.state.msgText,
        sender: this.props.authUser.id
      };
      firebase.sendMessage(this.props.activeChatID, message);
      this.setState({ msgText: '' });
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

export default ConversationForm;
