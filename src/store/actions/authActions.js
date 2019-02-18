import { toastr } from 'react-redux-toastr';
import { SET_USER, SIGN_IN, LOG_OUT } from './types';
import firebase from '../../firebase';

export const setUser = user => ({
  type: SET_USER,
  user
});

export const signIn = (email, password, cb) => dispatch => {
  firebase
    .doSignIn(email, password)
    .then(data => {
      // user data
      // console.log(data);
      dispatch({
        type: SIGN_IN,
        user: { name: data.user.email }
      });
      toastr.success('Signed in', 'Welcome to food order.');
      cb();
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
