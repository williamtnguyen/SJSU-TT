import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { loginBrother } from '../../redux/actions/authActions';
import loginStyles from './login.module.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentDidUpdate(prevProps) {
    // Redirect user to home page when logged in
    if (
      this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated &&
      this.props.auth.isAuthenticated
    ) {
      navigate('/');
    }
    if (this.props.errors !== prevProps.errors && this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Create brother login data object
    const brotherData = {
      email: this.state.email,
      password: this.state.password,
    };

    // Make API call and set global state
    this.props.loginBrother(brotherData);
  }

  render() {
    const { errors } = this.state;

    return (
      <section className={loginStyles.root}>
        <div className="container">
          <h1>
            <b>Login</b> broski
          </h1>
          <form noValidate onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(event) => this.handleChange(event)}
                value={this.state.email}
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
                onChange={(event) => this.handleChange(event)}
                value={this.state.password}
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
      </section>
    );
  }
}

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
