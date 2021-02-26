import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';

const UserContext = createContext();

/**
 * Context that holds the state of currently logged in user
 * @param {*} props.children, all nested components in App.js
 */
const UserProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const userContext = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  };

  useEffect(() => {
    if (localStorage.authToken) {
      const { authToken } = localStorage;

      // Puts auth token in HTTP header of all requests if it is present
      setAuthToken(authToken);

      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setUser({});
        setIsAuthenticated(false);
      } else {
        setUser(decodedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
