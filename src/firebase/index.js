import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAu7nmE6NQceSXthrAMZpEamZtwl9Ji-24',
  authDomain: 'food-order-react.firebaseapp.com',
  databaseURL: 'https://food-order-react.firebaseio.com',
  projectId: 'food-order-react',
  storageBucket: 'food-order-react.appspot.com',
  messagingSenderId: '447817230109'
};
firebase.initializeApp(config);

if (!firebase.app.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

// class Firebase {
//   constructor() {
//     firebase.initializeApp(config);

//     this.auth = firebase.auth();
//     this.firestore = firebase.firestore();
//   }

//   // auth methods
//   doSignUp(email, password) {
//     this.auth.createUserWithEmailAndPassword(email, password);
//   }

//   doSignIn(email, password) {
//     this.auth.signInWithEmailAndPassword(email, password);
//   }

//   // doLogOut, doResetPassword ...

//   // db methods
//   // getUser, getAllUsers, saveUser...
// }

// const firebase = new Firebase();
// export default firebase;
