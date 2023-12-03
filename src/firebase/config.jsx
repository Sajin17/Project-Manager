import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBkmKXwWGfTjOt93n8xl7lKMX0oEbl8geU",
    authDomain: "project-manager-e95ce.firebaseapp.com",
    projectId: "project-manager-e95ce",
    storageBucket: "project-manager-e95ce.appspot.com",
    messagingSenderId: "202978965138",
    appId: "1:202978965138:web:7502859feb263c7de9584b"
  };
  
// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timeStamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, projectStorage, timeStamp}