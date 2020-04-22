import firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "sjsuthetatau-firebase.firebaseapp.com",
    databaseURL: "https://sjsuthetatau-firebase.firebaseio.com",
    projectId: "sjsuthetatau-firebase",
    storageBucket: "sjsuthetatau-firebase.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(config);
/*
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

*/

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
