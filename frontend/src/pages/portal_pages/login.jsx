import React, { Component } from 'react';
import axios from 'axios';
import loginStyles from './login.module.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const brotherData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('/api/brothers/login')
      .then((response) => console.log(response))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  }

  render() {
    return (
      <section className={loginStyles.root}>
        <div className="container">
          <h1>
            <b>Login</b> broski
          </h1>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(event) => this.handleChange(event)}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={(event) => this.handleChange(event)}
                value={this.state.password}
              />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
