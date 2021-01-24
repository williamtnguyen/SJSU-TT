import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { loginBrother } from '../../redux/actions/brotherActions';
import loginStyles from './login.module.scss';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      navigate('/portal/dashboard');
    }
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        console.error('Unknown input ID');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create brother login data object
    const brotherData = {
      email,
      password,
    };

    // Make API call and set global state
    props.loginBrother(brotherData);
  };

  return (
    <div>
      <section className={loginStyles.root}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <div className="card">
            <div className="card-body">
              <h1 className="mb-3">
                <b>Login</b>
              </h1>
              <p>SJSU Theta Tau Actives Only</p>
              <form noValidate onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={(event) => handleChange(event)}
                    error={errors.email}
                    className={classnames('form-control', {
                      'is-invalid': errors.email || errors.emailnotfound,
                    })}
                  />
                  <span className="invalid-feedback">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={(event) => handleChange(event)}
                    error={errors.password}
                    className={classnames('form-control', {
                      'is-invalid': errors.password || errors.passwordincorrect,
                    })}
                  />
                  <span className="invalid-feedback">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <button type="submit" className="btn btn-warning">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  loginBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    emailnotfound: PropTypes.string,
    password: PropTypes.string,
    passwordincorrect: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  auth: {},
  errors: {},
  history: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
  errors: reduxState.errors,
});

export default connect(mapStateToProps, { loginBrother })(Login);
