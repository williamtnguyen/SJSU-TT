import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import classnames from 'classnames';
import { registerBrother } from '../../redux/actions/authActions';
import registerStyles from './register.module.scss';

import {
  MajorEnum,
  PledgeClassEnum,
  PositionEnum,
} from '../../util/enums/brother-enums';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentID, setStudentID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [major, setMajor] = useState('Aerospace Engineering');
  const [graduatingYear, setGraduatingYear] = useState(-1);
  const [pledgeClass, setPledgeClass] = useState('Alpha');
  const [position, setPosition] = useState('Member');
  const [isGraduated, setIsGraduated] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const [wasRegistered, setWasRegistered] = useState(false);
  const [registeredBrother, setRegisteredBrother] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.wasRegistered && props.auth.registeredBrother) {
      setWasRegistered(true);
      setRegisteredBrother(props.auth.registeredBrother);
      setErrors({});
    } else if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  const redirectToDashboard = () => {
    navigate('/portal/dashboard');
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'studentID':
        setStudentID(event.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(event.target.value);
        break;
      case 'major':
        setMajor(event.target.value);
        break;
      case 'graduatingYear':
        setGraduatingYear(event.target.value);
        break;
      case 'pledgeClass':
        setPledgeClass(event.target.value);
        break;
      case 'position':
        setPosition(event.target.value);
        break;
      case 'isGraduated':
        setIsGraduated(!isGraduated);
        break;
      default:
        console.error('Unknown input ID');
    }
  };

  const handleFileUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create brother object
    const brotherData = {
      name,
      email,
      studentID,
      phoneNumber,
      major,
      graduatingYear,
      pledgeClass,
      position,
      isGraduated,
      imageFile,
    };

    // Make API call and set global state
    props.registerBrother(brotherData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section className={registerStyles.root}>
        <div
          className="container"
          style={{
            maxWidth: '500px',
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          <button
            onClick={() => redirectToDashboard()}
            type="button"
            className="btn mb-3 text-white"
          >
            ← Back to dashboard
          </button>
          <div className="card">
            <div className="card-body">
              <h1 className="mb-3">
                <b>Register</b> a new brother
              </h1>
              {/* Success message when a bruh is registered */}
              {wasRegistered && (
                <p>{registeredBrother} was successfully registered!</p>
              )}
              <form noValidate onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    onChange={(event) => handleChange(event)}
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
                    onChange={(event) => handleChange(event)}
                    error={errors.email}
                    className={classnames('form-control', {
                      'is-invalid': errors.email,
                    })}
                  />
                  <span className="invalid-feedback">{errors.email}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="studentID">
                    Student ID (leave empty if Alumni)
                  </label>
                  <input
                    type="number"
                    id="studentID"
                    placeholder="Enter Student ID (Numeric values only)"
                    onChange={(event) => handleChange(event)}
                    error={errors.studentID}
                    className={classnames('form-control', {
                      'is-invalid': errors.studentID,
                    })}
                  />
                  <span className="invalid-feedback">{errors.studentID}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    placeholder="Enter phone number (Numeric values only)"
                    onChange={(event) => handleChange(event)}
                    error={errors.phoneNumber}
                    className={classnames('form-control', {
                      'is-invalid': errors.phoneNumber,
                    })}
                  />
                  <span className="invalid-feedback">{errors.phoneNumber}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="major">Major</label>
                  <select
                    id="major"
                    onChange={(event) => handleChange(event)}
                    error={errors.major}
                    className={classnames('form-control', {
                      'is-invalid': errors.major,
                    })}
                  >
                    {Object.values(MajorEnum).map((majorListItem) => (
                      <option key={majorListItem}>{majorListItem}</option>
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
                    onChange={(event) => handleChange(event)}
                    error={errors.graduatingYear}
                    className={classnames('form-control', {
                      'is-invalid': errors.graduatingYear,
                    })}
                  />
                  <span className="invalid-feedback">
                    {errors.graduatingYear}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="pledgeClass">Pledge class</label>
                  <select
                    id="pledgeClass"
                    onChange={(event) => handleChange(event)}
                    error={errors.pledgeClass}
                    className={classnames('form-control', {
                      'is-invalid': errors.pledgeClass,
                    })}
                  >
                    {Object.values(PledgeClassEnum).map(
                      (pledgeClassListItem) => (
                        <option key={pledgeClassListItem}>
                          {pledgeClassListItem}
                        </option>
                      )
                    )}
                  </select>
                  <span className="invalid-feedback">{errors.pledgeClass}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    onChange={(event) => handleChange(event)}
                    error={errors.position}
                    className={classnames('form-control', {
                      'is-invalid': errors.position,
                    })}
                  >
                    {Object.values(PositionEnum).map((positionListItem) => (
                      <option key={positionListItem}>{positionListItem}</option>
                    ))}
                  </select>
                  <span className="invalid-feedback">{errors.position}</span>
                </div>
                <div className="form-group">
                  <div className="form-check pl-0">
                    <input
                      type="checkbox"
                      id="isGraduated"
                      onChange={(event) => handleChange(event)}
                      className="form-check-input"
                    />
                    <label htmlFor="isGraduated" className="form-check-label">
                      Is Graduated?
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="imageFile">Image</label>
                  <input
                    type="file"
                    id="imageFile"
                    onChange={(event) => handleFileUpload(event)}
                    className="form-control-file"
                  />
                </div>
                <button type="submit" className="btn btn-warning mt-3">
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

Register.propTypes = {
  registerBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    wasRegistered: PropTypes.bool,
    registeredBrother: PropTypes.string,
  }),
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    studentID: PropTypes.string,
    major: PropTypes.string,
    graduatingYear: PropTypes.string,
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
