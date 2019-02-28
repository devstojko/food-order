import { GET_CONVERSATIONS } from './types';
import firebase from '@fb';

export const getConversations = () => dispatch => {
  firebase
    .fetchConversations()
    .then(querySnapshot => {
      const conversations = [];
      querySnapshot.forEach(doc => {
        conversations.push({ id: doc.id, ...doc.data() });
      });

      dispatch({
        type: GET_CONVERSATIONS,
        payload: conversations
      });
    })
    .catch(err => toastr.error('There was an error', err.message));
};
