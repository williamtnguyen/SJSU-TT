import firebase, { auth, provider } from './firebase.js';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () => {
  checkLinkLogin(); // if user is coming from login link, user is auto logged in
  const loggedInUser = window.localStorage.getItem('loggedInUser');
  return loggedInUser;
};

export const isLoggedIn = () => {
  const user = getUser();
  if(user)
  {
    return !!user.username;
  }
}


export const logout = (callback) => {
  window.localStorage.removeItem('loggedInUser');
  setUser({});
  callback();
};


const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:8000',
  // This must be true.
  handleCodeInApp: true
};


// requests an link be set to user's email for 1 click login
export function linkLoginRequest(email) {
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      return true;
    })
    .catch((error) => {
    // Some error occurred, you can inspect the code: error.code

    });
  return false;
}


// checks to see if we are currently coming from an 1 click login email link,
// and logs user in
export function checkLinkLogin() {
  const email = window.localStorage.getItem('emailForSignIn');
  if (email) {
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then((result) => {
      // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.setItem('loggedInUser', result.user);
        return result.user;

      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      });
  }


  return null;
}
