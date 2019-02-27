import React, { Component } from 'react';
// testing
import firebase from '../../../../firebase';

// const ConversationMsgBox = () => (
//   <div className="conversation__msg-box">
//   </div>
// );

class ConversationMsgBox extends Component {
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
    // active id is hardcoded for now
    const activeChatID = 'lw7EHSp12goiesEO8tpS';
    firebase.sendMessage(activeChatID, this.state.msgText);
    this.setState({ msgText: '' });
  }

  render() {
    return (
      <div className="conversation__msg-box">
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.msgText} onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default ConversationMsgBox;
