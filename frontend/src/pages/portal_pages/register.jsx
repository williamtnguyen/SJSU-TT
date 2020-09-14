import React, { Component } from 'react';
import axios from 'axios';
import registerStyles from './register.module.scss';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      major: 'Aerospace Engineering',
      graduatingYear: 2020,
      pledgeClass: 'Alpha',
      position: 'Member',
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const brotherData = {
      name: this.state.name,
      email: this.state.email,
      major: this.state.major,
      graduatingYear: this.state.graduatingYear,
      pledgeClass: this.state.pledgeClass,
      position: this.state.position,
    };

    axios
      .post('/api/brothers/register', brotherData)
      .then((response) => console.log(response))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  }

  render() {
    return (
      <section className={registerStyles.root}>
        <div className="container">
          <h1>
            <b>Register</b> a new brother
          </h1>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                onChange={(event) => this.handleChange(event)}
                value={this.state.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
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
              <label htmlFor="major">Major</label>
              <select
                className="form-control"
                id="major"
                onChange={(event) => this.handleChange(event)}
                value={this.state.major}
              >
                <option>Aerospace Engineering</option>
                <option>Biomedical Engineering</option>
                <option>Civil Engineering</option>
                <option>Computer Engineering</option>
                <option>Computer Science</option>
                <option>Electrical Engineering</option>
                <option>General Engineering</option>
                <option>Industrial Engineering</option>
                <option>Math</option>
                <option>Mechanical Engineering</option>
                <option>Software Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Graduating year</label>
              <input
                type="number"
                className="form-control"
                id="graduatingYear"
                placeholder="Enter graduating year"
                onChange={(event) => this.handleChange(event)}
                value={this.state.graduatingYear}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pledgeClass">Pledge class</label>
              <select
                className="form-control"
                id="pledgeClass"
                onChange={(event) => this.handleChange(event)}
                value={this.state.pledgeClass}
              >
                <option>Alpha</option>
                <option>Beta</option>
                <option>Gamma</option>
                <option>Delta</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                className="form-control"
                id="position"
                onChange={(event) => this.handleChange(event)}
                value={this.state.position}
              >
                <option>Member</option>
                <option>breh</option>
              </select>
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

export default Register;
