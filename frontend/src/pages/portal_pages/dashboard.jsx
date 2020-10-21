import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../redux/store';
import Navbar from '../../components/NavBar';
import { logoutBrother } from '../../redux/actions/authActions';

const Dashboard = (props) => {
  const handleLogout = () => {
    store.dispatch(logoutBrother());
  };

  return (
    <div>
      <Navbar />
      <div
        className="container"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div className="mb-5">
          <h1 className="mb-3">Hi, {props.auth.user.name}</h1>
          <h4>
            This is the dashboard. Only authenticated members can see this page
          </h4>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h5>Possible actions:</h5>
          <button
            onClick={() => {
              window.location.href = './register';
            }}
            type="button"
            className="btn btn-warning mb-3"
          >
            Register a Brother
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-warning"
          >
            Logout
          </button>
        </div>
      </div>
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
