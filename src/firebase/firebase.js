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
