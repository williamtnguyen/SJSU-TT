import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../util/setAuthToken';

import { GET_ERRORS, SET_CURRENT_BROTHER } from './types';

// Helper function
export const setCurrentBrother = (decodedToken) => {
  return {
    type: SET_CURRENT_BROTHER,
    payload: decodedToken,
  };
};

// REGISTER Brother action
export const registerBrother = (brotherData) => (dispatch) => {
  axios
    .post('/api/brothers/register', brotherData)
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// LOGIN Brother action
export const loginBrother = (brotherData) => (dispatch) => {
  axios
    .post('/api/brothers/login', brotherData)
    .then((response) => {
      // Store token in localStorage, then as auth header in all axios requests
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);

      // Decode token to get user data in payload, then store in redux state
      const decodedToken = jwtDecode(token);
      dispatch(setCurrentBrother(decodedToken));
    })
    .catch((error) =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// LOGOUT Brother action
export const logoutBrother = () => (dispatch) => {
  // Remove JWT from localStorage, auth header, and clear current logged-in brother
  localStorage.removeItem('authToken');
  setAuthToken(false);
  dispatch(setCurrentBrother({}));
};
