import axios from 'axios';

// Puts auth token in HTTP header of all requests if it is present
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
