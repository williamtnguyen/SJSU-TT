import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../util/setAuthToken';

import { GET_ERRORS, SET_CURRENT_BROTHER } from './types';

// Helper function
const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_BROTHER,
    payload: decodedToken,
  };
};

// REGISTER Brother action
const registerBrother = (brotherData) => (dispatch) => {
  axios
    .post('/api/brothers/register', brotherData)
    .then((res) => res.status(200).send('Brother Registered!'))
    .catch((error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      })
    );
};

// LOGIN Brother action
const loginBrother = (brotherData) => (dispatch) => {
  axios
    .post('/api/brothers/login', brotherData)
    .then((res) => {
      // Store token in localStorage, then as auth header in all axios requests
      const { token } = res.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);

      // Decode token to get user data in payload, then store in redux state
      const decodedToken = jwtDecode(token);
      dispatch(setCurrentUser(decodedToken));
    })
    .catch((error) =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// LOGOUT Brother action
const logoutBrother = () => (dispatch) => {
  // Remove JWT from localStorage, auth header, and clear current logged-in brother
  localStorage.removeItem('authToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export { registerBrother, loginBrother, logoutBrother };
