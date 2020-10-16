import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (!auth.isAuthenticated) {
    navigate('/portal/login');
    return null;
  }

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
