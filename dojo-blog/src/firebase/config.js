import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjUvvqpRMOokv-2OdNXGBnjPE6xHwKqRw",
    authDomain: "vuefirebase-9bea3.firebaseapp.com",
    projectId: "vuefirebase-9bea3",
    storageBucket: "vuefirebase-9bea3.appspot.com",
    messagingSenderId: "135400096251",
    appId: "1:135400096251:web:df95444ae88f5e4372cb5e"
};
// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };