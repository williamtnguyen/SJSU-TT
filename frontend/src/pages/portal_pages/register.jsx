import React, { Component } from 'react';
import axios from 'axios';
import registerStyles from './register.module.scss';

import {
  MajorEnum,
  PledgeClassEnum,
  PositionEnum,
} from '../../../../routes/api/util/enums/brother-enums';

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
      errors: {},
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
    const { errors } = this.state;

    return (
      <section className={registerStyles.root}>
        <div className="container">
          <h1>
            <b>Register</b> a new brother
          </h1>
          <form noValidate onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                onChange={(event) => this.handleChange(event)}
                value={this.state.name}
                error={errors.name}
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
                error={errors.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="major">Major</label>
              <select
                className="form-control"
                id="major"
                onChange={(event) => this.handleChange(event)}
                value={this.state.major}
                error={errors.major}
              >
                {Object.values(MajorEnum).map((major) => (
                  <option key={major}>{major}</option>
                ))}
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
                error={errors.graduatingYear}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pledgeClass">Pledge class</label>
              <select
                className="form-control"
                id="pledgeClass"
                onChange={(event) => this.handleChange(event)}
                value={this.state.pledgeClass}
                error={errors.pledgeClass}
              >
                {Object.values(PledgeClassEnum).map((pledgeClass) => (
                  <option key={pledgeClass}>{pledgeClass}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                className="form-control"
                id="position"
                onChange={(event) => this.handleChange(event)}
                value={this.state.position}
                error={errors.position}
              >
                {Object.values(PositionEnum).map((position) => (
                  <option key={position}>{position}</option>
                ))}
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
