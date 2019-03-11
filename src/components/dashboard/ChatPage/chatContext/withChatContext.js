import React from 'react';
import { ChatContext } from './Provider';

export function withChatContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ChatContext.Consumer>
        {state => <Component {...props} context={state} />}
      </ChatContext.Consumer>
    );
  };
}
