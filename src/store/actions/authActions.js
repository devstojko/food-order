import { SIGN_IN, LOG_OUT } from './types';
import firebase from '../../firebase';

export const signIn = (email, password, cb) => dispatch => {
  firebase
    .doSignUp(email, password)
    .then(data => {
      // user data
      console.log(data);
      dispatch({
        type: SIGN_IN,
        user: { name: data.user.email }
      });
      cb();
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
};

export const logOut = () => dispatch => {
  firebase.doLogOut().then(() =>
    dispatch({
      type: LOG_OUT
    })
  );
};
