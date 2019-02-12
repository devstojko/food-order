import { auth } from '../../firebase/firebase';

export const signIn = (email, password) => dispatch => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      dispatch({
        type: 'SIGN_IN',
        user: { name: data.user.email }
      });
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
};

// export const logOut = () => {
//   console.log('log out');
// };
