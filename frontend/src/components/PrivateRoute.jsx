import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    } else if (!auth.isAuthenticated) {
      navigate('/portal/login');
    }
  }, [hasMounted, auth.isAuthenticated]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

PrivateRoute.defaultProps = {
  auth: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
