import { GET_CONVERSATIONS } from './types';
import firebase from '../../firebase';

export const getConversations = () => dispatch => {
  firebase
    .fetchConversations()
    .then(querySnapshot => {
      const conversations = [];
      querySnapshot.forEach(doc => {
        conversations.push({ id: doc.id, ...doc.data() });
      });

      console.log(conversations);
      dispatch({
        type: GET_CONVERSATIONS,
        payload: conversations
      });
    })
    .catch(err => toastr.error('There was an error', err.message));
};
