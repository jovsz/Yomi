import firebase from "firebase";
import Axios from "axios";

let config = {
    apiKey: "AIzaSyC7MJ3ItwQqgjMat9o9mFN3wILV8zY3sHw",
    authDomain: "yomi-461fb.firebaseapp.com",
    projectId: "yomi-461fb",
    storageBucket: "yomi-461fb.appspot.com",
    messagingSenderId: "7026209468",
    appId: "1:7026209468:web:ed0b5e4888353cea0116b9",
    measurementId: "G-X9K6554286"
  };

  firebase.initializeApp(config);
  
  let db = firebase.firestore();

  export { db };