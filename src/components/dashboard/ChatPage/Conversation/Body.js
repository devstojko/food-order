import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withChatContext } from '../chatContext/withChatContext';
import Message from './Message';
import firebase from '@fb';

class ConversationBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.conversationBodyRef = React.createRef();
  }

  componentDidMount() {
    const { activeChat } = this.props.context;
    if (activeChat) {
      this.setMessagesListener(activeChat.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { activeChat } = this.props.context;
    const currentChatID = activeChat ? activeChat.id : null;
    const prevChatID = prevProps.context.activeChat
      ? prevProps.context.activeChat.id
      : null;

    if (currentChatID && currentChatID !== prevChatID) {
      this.setMessagesListener(currentChatID);
    }
  }

  setMessagesListener(chatID) {
    this.listener = firebase.chatMessages(chatID).onSnapshot(snapshot => {
      this.setState({ messages: [] });
      snapshot.forEach(doc => {
        const msg = { id: doc.id, ...doc.data() };
        this.setState({ messages: [...this.state.messages, msg] });
        this.conversationBodyRef.current.scrollTop = this.conversationBodyRef.current.scrollHeight;
      });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser, context } = this.props;
    const { activeChat } = context;

    return (
      <div className="conversation__body" ref={this.conversationBodyRef}>
        {activeChat && this.state.messages.length > 0 ? (
          this.state.messages.map(msg => {
            return (
              <Message
                key={msg.id}
                msg={msg}
                position={msg.sender === authUser.id ? 'right' : 'left'}
              />
            );
          })
        ) : (
          <div className="info-msg info-msg--big">
            <FormattedMessage
              id="startChat"
              defaultMessage="Start a conversation by sending a message"
            />
          </div>
        )}
      </div>
    );
  }
}

ConversationBody.propTypes = {
  authUser: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

export default withChatContext(ConversationBody);
