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

  // db methods
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

  conversationMessages(convID) {
    return this.firestore
      .collection('conversations')
      .doc(convID)
      .collection('messages');
  }

  sendMessage(convID, msg) {
    return this.firestore
      .collection('conversations')
      .doc(convID)
      .collection('messages')
      .add(msg);
  }

  // testing
  createConversation(user1, user2) {
    const conversationObj = {
      user1,
      user2
    };
    return this.firestore.collection('conversations').add(conversationObj);
  }

  userReference(id) {
    return this.firestore.collection('users').doc(id);
  }

  fetchMyConversations(myID) {
    // return this.firestore
    //   .collection('conversations')
    //   .where('participants', 'array-contains', myID); // ?

    const results = [];

    this.firestore
      .collection('conversations')
      .where('user1', '==', this.userReference(myID))
      .get()
      .then(snapshots => {
        snapshots.forEach(c => {
          const chat = { id: c.id, ...c.data() };
          results.push(chat);
        });
      });

    this.firestore
      .collection('conversations')
      .where('user2', '==', this.userReference(myID))
      .get()
      .then(snapshots => {
        snapshots.forEach(c => {
          const chat = { id: c.id, ...c.data() };
          results.push(chat);
        });
      });

    return results;
  }
}

const firebase = new Firebase();
export default firebase;
