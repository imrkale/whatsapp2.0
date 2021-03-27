import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBWY02z1C4U1OS4lXlTDpsMqLsYx8COwBQ",
    authDomain: "whatsapp2-33b96.firebaseapp.com",
    projectId: "whatsapp2-33b96",
    storageBucket: "whatsapp2-33b96.appspot.com",
    messagingSenderId: "480305775480",
    appId: "1:480305775480:web:a6728c6485dbc64dd07e8d",
    measurementId: "G-GM486S7YYB"
  };
  // Initialize Firebase

  const firebaseApp=!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider,db};

  