import { SIGN_IN, LOG_OUT } from './types';
import { auth } from '../../firebase';

export const signIn = (email, password, cb) => dispatch => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(data => {
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
  auth.signOut().then(() =>
    dispatch({
      type: LOG_OUT
    })
  );
};
