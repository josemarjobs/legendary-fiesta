import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDjUvvqpRMOokv-2OdNXGBnjPE6xHwKqRw",
    authDomain: "vuefirebase-9bea3.firebaseapp.com",
    projectId: "vuefirebase-9bea3",
    storageBucket: "vuefirebase-9bea3.appspot.com",
    messagingSenderId: "135400096251",
    appId: "1:135400096251:web:9cd9673ec21afc7a72cb5e"
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };