// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import store from '../redux/store';
import {
  setCurrentBrother,
  logoutBrother,
} from '../redux/actions/brotherActions';

const persistLogin = () => {
  // Checks for JSON Web Token in localStorage (should be refactored) to persist user logins
  if (localStorage.authToken) {
    const { authToken } = localStorage;

    // Puts the token in authorization headers for all HTTP requests
    setAuthToken(authToken);

    // Decode the JSON Web Token (which is actually just a user object), and set it in global state
    const decodedToken = jwt_decode(authToken);
    store.dispatch(setCurrentBrother(decodedToken));

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      store.dispatch(logoutBrother());
      window.location.href = './login';
    }
  }
};

export default persistLogin;
