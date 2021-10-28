import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBg2bKJkf9aP5JjGCu_XFPX3PD2UPTItmc",

    authDomain: "music-913ba.firebaseapp.com",
  
    projectId: "music-913ba",
  
    storageBucket: "music-913ba.appspot.com",
  
    messagingSenderId: "28967870433",
  
    appId: "1:28967870433:web:6d206ba42dfc84cf05fca0"
  
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()
const store = firebase.storage()

export default db
export { store, auth }