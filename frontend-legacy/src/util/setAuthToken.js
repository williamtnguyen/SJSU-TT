import axios from 'axios';

const setAuthToken = (token) => {
  // Apply authorization token to every request if logged in
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  }
  // Logging a user out, delete the auth header
  else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
