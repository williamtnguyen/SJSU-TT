import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBscZT2DCQ8EXK9gSlmcTyb12sffpjLeAQ",
    authDomain: "sjsuthetatau-firebase.firebaseapp.com",
    databaseURL: "https://sjsuthetatau-firebase.firebaseio.com",
    projectId: "sjsuthetatau-firebase",
    storageBucket: "sjsuthetatau-firebase.appspot.com",
    messagingSenderId: "884429717378",
    appId: "1:884429717378:web:3e57ffa0e1ac2b40c0999b",
    measurementId: "G-4DY8ZB30ZM"
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
