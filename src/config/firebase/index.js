import firebase from "firebase/compat/app";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAZwNYRWADeYJ82Q7uk6dYNbZNhexmHLhE",
    authDomain: "simple-notes-firebase-123.firebaseapp.com",
    projectId: "simple-notes-firebase-123",
    storageBucket: "simple-notes-firebase-123.appspot.com",
    messagingSenderId: "1043728900181",
    appId: "1:1043728900181:web:1490714677411a78b734dc",
    measurementId: "G-2C4MWJZ5GE"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const app = initializeApp(firebaseConfig);

  // Get a reference to the database service
  export const database = getDatabase(app);


  export default firebase;