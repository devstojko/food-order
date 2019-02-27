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

  fetchConversations() {
    return this.firestore.collection('conversations').get();
  }

  listenForMessages(convID, cb) {
    return this.firestore
      .collection('conversations')
      .doc(convID)
      .collection('messages')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(cb);
      });
  }

  sendMessage(convID, msg) {
    return this.firestore
      .collection('conversations')
      .doc(convID)
      .collection('messages')
      .add({ msg });
  }

  // fetchConversationMessages(convID) {
  //   return this.firestore
  //     .collection('conversations')
  //     .doc(convID)
  //     .collection('messages')
  //     .get();
  // }

  // firebase
  // .fetchConversationMessages(doc.id)
  // .then(msgSnapshot => {
  //   msgSnapshot.forEach(msg => console.log(msg.data()));
  // })
  // .catch(err => console.log(err));
}

const firebase = new Firebase();
export default firebase;
