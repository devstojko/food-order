import React, { Component } from 'react';
import ConversationBody from './ConversationBody';
import ConversationForm from './ConversationForm';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import './Conversation.scss';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  // componentDidMount() {
  //   // change the ID from static
  //   firebase
  //     .conversationMessages(this.props.activeChat)
  //     .onSnapshot(snapshot => {
  //       this.setState({ messages: [] });
  //       snapshot.forEach(doc => {
  //         const msg = { id: doc.id, ...doc.data() };
  //         this.setState({ messages: [...this.state.messages, msg] });
  //       });
  //     });
  // }

  render() {
    const { withUser } = this.props;

    return (
      <div className="conversation">
        <div className="conversation__header">
          <Avatar size="large" />
          <div className="conversation__user">
            <strong>
              {withUser.firstName || 'testing'}{' '}
              {withUser.lastName || 'testingg'}
            </strong>
            <span>Account Manager</span>
          </div>
          <i className="fas fa-times" />
        </div>
        <ConversationBody messages={this.state.messages} />
        <ConversationForm />
      </div>
    );
  }
}

export default Conversation;
