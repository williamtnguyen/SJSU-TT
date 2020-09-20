import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerBrother } from '../../redux/actions/authActions';
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

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors && this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Create brother object
    const brotherData = {
      name: this.state.name,
      email: this.state.email,
      major: this.state.major,
      graduatingYear: this.state.graduatingYear,
      pledgeClass: this.state.pledgeClass,
      position: this.state.position,
    };

    // Make API call and set global state
    this.props.registerBrother(brotherData);
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
                id="name"
                placeholder="Enter name"
                onChange={(event) => this.handleChange(event)}
                value={this.state.name}
                error={errors.name}
                className={classnames('form-control', {
                  'is-invalid': errors.name,
                })}
              />
              <span className="invalid-feedback">{errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(event) => this.handleChange(event)}
                value={this.state.email}
                error={errors.email}
                className={classnames('form-control', {
                  'is-invalid': errors.email,
                })}
              />
              <span className="invalid-feedback">{errors.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="major">Major</label>
              <select
                id="major"
                onChange={(event) => this.handleChange(event)}
                value={this.state.major}
                error={errors.major}
                className={classnames('form-control', {
                  'is-invalid': errors.major,
                })}
              >
                {Object.values(MajorEnum).map((major) => (
                  <option key={major}>{major}</option>
                ))}
              </select>
              <span className="invalid-feedback">{errors.major}</span>
            </div>
            <div className="form-group">
              <label htmlFor="name">Graduating year</label>
              <input
                type="number"
                id="graduatingYear"
                placeholder="Enter graduating year"
                onChange={(event) => this.handleChange(event)}
                value={this.state.graduatingYear}
                error={errors.graduatingYear}
                className={classnames('form-control', {
                  'is-invalid': errors.graduatingYear,
                })}
              />
              <span className="invalid-feedback">{errors.graduatingYear}</span>
            </div>
            <div className="form-group">
              <label htmlFor="pledgeClass">Pledge class</label>
              <select
                id="pledgeClass"
                onChange={(event) => this.handleChange(event)}
                value={this.state.pledgeClass}
                error={errors.pledgeClass}
                className={classnames('form-control', {
                  'is-invalid': errors.pledgeClass,
                })}
              >
                {Object.values(PledgeClassEnum).map((pledgeClass) => (
                  <option key={pledgeClass}>{pledgeClass}</option>
                ))}
              </select>
              <span className="invalid-feedback">{errors.pledgeClass}</span>
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                id="position"
                onChange={(event) => this.handleChange(event)}
                value={this.state.position}
                error={errors.position}
                className={classnames('form-control', {
                  'is-invalid': errors.position,
                })}
              >
                {Object.values(PositionEnum).map((position) => (
                  <option key={position}>{position}</option>
                ))}
              </select>
              <span className="invalid-feedback">{errors.position}</span>
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

Register.propTypes = {
  registerBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    major: PropTypes.string,
    graduatingYear: PropTypes.number,
    pledgeClass: PropTypes.string,
    position: PropTypes.string,
  }),
};

Register.defaultProps = {
  auth: {},
  errors: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
  errors: reduxState.errors,
});

export default connect(mapStateToProps, { registerBrother })(Register);
