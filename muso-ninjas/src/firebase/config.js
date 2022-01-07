import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDppG_O5mhPtRtoMcIlyssxiSKIkfeLXtM",
    authDomain: "muso-ninjas-e3e62.firebaseapp.com",
    projectId: "muso-ninjas-e3e62",
    storageBucket: "muso-ninjas-e3e62.appspot.com",
    messagingSenderId: "731154086810",
    appId: "1:731154086810:web:d038e1284433bcdcf65823"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };