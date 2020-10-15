import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import { logoutBrother } from '../redux/actions/authActions';

const Dashboard = () => {
  const handleLogout = () => {
    store.dispatch(logoutBrother());
  };

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 className="text-center">This is a private page</h1>
      <button
        onClick={handleLogout}
        type="button"
        className="btn btn-warning ml-3"
      >
        Logout
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

Dashboard.defaultProps = {
  auth: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
