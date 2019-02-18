import { toastr } from 'react-redux-toastr';
import { SET_USER, LOG_OUT } from './types';
import firebase from '../../firebase';

export const setUser = user => ({
  type: SET_USER,
  user
});

export const signIn = (email, password) => dispatch => {
  firebase
    .doSignIn(email, password)
    .then(data => {
      const user = {
        email: data.user.email,
        id: data.user.uid
      };
      dispatch(setUser(user));
      toastr.success('Signed in', 'Welcome to food order.');
    })
    .catch(err => toastr.error('There was an error', err.message));
};

export const logOut = () => dispatch => {
  firebase
    .doLogOut()
    .then(() => {
      dispatch({
        type: LOG_OUT
      });
      toastr.success('Logged out successfully', 'Thanks for stopping by.');
    })
    .catch(err => toastr.error('There was an error', err.message));
};
