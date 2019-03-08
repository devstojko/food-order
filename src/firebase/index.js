import * as app from 'firebase/app';
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

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  // auth methods
  doSignUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignInWithGoogle() {
    return app.auth().signInWithPopup(new app.auth.GoogleAuthProvider());
  }

  doLogOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  // db user methods
  userReference(id) {
    return this.firestore.collection('users').doc(id);
  }

  saveUser(id, user) {
    return this.firestore
      .collection('users')
      .doc(id)
      .set({ ...user });
  }

  fetchUser(id) {
    return this.firestore
      .collection('users')
      .doc(id)
      .get();
  }

  fetchUsersByName(term) {
    return this.firestore
      .collection('users')
      .where('firstName', '==', term)
      .get();
  }

  // chat methods
  createChat(user1, user2) {
    return this.firestore
      .collection('chats')
      .add({ participants: [user1, user2] });
  }

  createGroupChat(name, participants) {
    return this.firestore.collection('chats').add({ name, participants });
  }

  fetchMyChats(myID) {
    return this.firestore
      .collection('chats')
      .where('participants', 'array-contains', this.userReference(myID));
  }

  chatMessages(chatID) {
    return this.firestore
      .collection('chats')
      .doc(chatID)
      .collection('messages')
      .orderBy('time');
  }

  sendMessage(chatID, msg) {
    return this.firestore
      .collection('chats')
      .doc(chatID)
      .collection('messages')
      .add(msg);
  }
}

const firebase = new Firebase();
export default firebase;
