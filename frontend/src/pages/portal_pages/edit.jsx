import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';
import classnames from 'classnames';
import { editBrother } from '../../redux/actions/authActions';
import Navbar from '../../components/NavBar';
import editStyles from './edit.module.scss';

import { MajorEnum } from '../../../../server/routes/api/util/enums/brother-enums';

/**
 * Returns an object of changed fields for currently logged in user
 * @param {*} currentBrotherData data currently saved in DB
 * @param {*} updatedBrotherData data currently in form inputs
 */
const findDelta = (currentBrotherData, updatedBrotherData) => {
  const delta = {};
  Object.keys(updatedBrotherData).forEach((field) => {
    if (
      (field !== 'password' || updatedBrotherData[field] !== '') &&
      currentBrotherData[field] !== updatedBrotherData[field]
    ) {
      delta[field] = updatedBrotherData[field];
    }
  });
  return delta;
};

const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

const Edit = (props) => {
  const [currentBrotherData, setCurrentBrotherData] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newMajor, setNewMajor] = useState('');
  const [newGradYear, setNewGradYear] = useState('');

  const [fetchError, setFetchError] = useState(false);
  const [noEditError, setNoEditError] = useState(false);
  const [submitErrors, setSubmitErrors] = useState({});

  const [wasEdited, setWasEdited] = useState(false);
  const [editedBrother, setEditedBrother] = useState('');

  useEffect(() => {
    if (props.auth.user.id) {
      assignInputValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.user.id]);

  useEffect(() => {
    if (props.auth.wasEdited && props.auth.editedBrother) {
      setWasEdited(true);
      setEditedBrother(props.auth.editedBrother);
      setSubmitErrors({});
    } else if (props.errors) {
      setSubmitErrors(props.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.wasEdited, props.auth.editedBrother, props.errors]);

  const assignInputValues = async () => {
    try {
      const apiResponse = await axios.get(
        `/api/brothers/edit/${props.auth.user.id}`
      );

      // Cache current state for client-side validation
      setCurrentBrotherData(apiResponse.data);
      // Initialize form inputs to current state
      setNewEmail(apiResponse.data.email);
      setNewBio(apiResponse.data.biography);
      setNewMajor(apiResponse.data.major);
      setNewGradYear(apiResponse.data.graduatingYear);
    } catch (error) {
      setFetchError(true);
    }
  };

  const redirectToDashboard = () => {
    navigate('/portal/dashboard');
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setNewEmail(event.target.value);
        break;
      case 'password':
        setNewPassword(event.target.value);
        break;
      case 'major':
        setNewMajor(event.target.value);
        break;
      case 'graduatingYear':
        setNewGradYear(event.target.value);
        break;
      case 'biography':
        setNewBio(event.target.value);
        break;
      default:
        console.error('Unknown input ID');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: newEmail,
      password: newPassword,
      major: newMajor,
      graduatingYear: newGradYear,
      biography: newBio,
    };

    const delta = findDelta(currentBrotherData, formData);
    const fieldsEdited = !isEmpty(delta);
    if (!fieldsEdited) {
      setNoEditError(true);
    } else {
      setNoEditError(false);
      // Make API call and set global state
      props.editBrother(props.auth.user.id, props.auth.user.name, delta);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section className={editStyles.root}>
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
                <b>Edit</b> your profile
              </h1>
              <p>Update one or more fields below</p>
              {/* Success message when a bruh is edited */}
              {wasEdited && <p>{editedBrother} was successfully edited!</p>}
              {noEditError && (
                <p className={editStyles.error__message}>
                  No fields were edited
                </p>
              )}
              {fetchError ? (
                <div>
                  <p>
                    Cannot seem to fetch information about currently logged in
                    user, so this form cannot be used.
                  </p>
                </div>
              ) : (
                <form noValidate onSubmit={(event) => handleSubmit(event)}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={newEmail}
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.email}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.email,
                      })}
                    />
                    <span className="invalid-feedback">
                      {submitErrors.email}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter new password"
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.name}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.password,
                      })}
                    />
                    <span className="invalid-feedback">
                      {submitErrors.password}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="major">Major</label>
                    <select
                      id="major"
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.major}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.major,
                      })}
                    >
                      {Object.values(MajorEnum).map((majorListItem) => {
                        if (majorListItem === currentBrotherData.major) {
                          return (
                            <option selected key={majorListItem}>
                              {majorListItem}
                            </option>
                          );
                        }
                        return (
                          <option key={majorListItem}>{majorListItem}</option>
                        );
                      })}
                    </select>
                    <span className="invalid-feedback">
                      {submitErrors.major}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Graduating year</label>
                    <input
                      type="number"
                      id="graduatingYear"
                      placeholder="Enter graduating year"
                      value={newGradYear}
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.graduatingYear}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.graduatingYear,
                      })}
                    />
                    <span className="invalid-feedback">
                      {submitErrors.graduatingYear}
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="biography">Biography</label>
                    <textarea
                      id="biography"
                      placeholder="Enter biography"
                      value={newBio}
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.biophraphy}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.biography,
                      })}
                    />
                  </div>
                  <button type="submit" className="btn btn-warning">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Edit.propTypes = {
  editBrother: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    wasEdited: PropTypes.bool,
    editedBrother: PropTypes.string,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    major: PropTypes.string,
    graduatingYear: PropTypes.string,
  }),
};

Edit.defaultProps = {
  auth: {},
  errors: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
  errors: reduxState.errors,
});

export default connect(mapStateToProps, { editBrother })(Edit);
