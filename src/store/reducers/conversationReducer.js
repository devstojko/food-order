import { GET_CONVERSATIONS } from '../actions/types';

// dummy data
const initialState = [
  {
    id: 1,
    participants: [
      { id: 123, email: '123@gmail.com' },
      { id: 456, email: '456@gmail.com' }
    ],
    messages: [
      { senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 456, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 123, text: 'some dummy text', time: 'asfdadsf' }
    ]
  },
  {
    id: 2,
    participants: [
      { id: 123, email: '123@gmail.com' },
      { id: 789, email: '789@gmail.com' }
    ],
    messages: [
      { senderID: 789, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 789, text: 'some dummy text', time: 'asfdadsf' },
      { senderID: 789, text: 'some dummy text', time: 'asfdadsf' }
    ]
  }
];

export default function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
}
