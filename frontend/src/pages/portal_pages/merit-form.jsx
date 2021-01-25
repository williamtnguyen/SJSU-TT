import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';
import classnames from 'classnames';
import { submitMeritRequest } from '../../redux/actions/meritActions';
import meritFormStyles from './merit-form.module.scss';

import { MeritOperationEnum } from '../../util/enums/merit-enums';

import CURR_PLEDGE_CLASS from '../../util/curr-pledge-class';

const MeritForm = (props) => {
  const [didMount, setDidMount] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [selectedPledge, setSelectedPledge] = useState('');
  const [operation, setOperation] = useState(MeritOperationEnum.DEMERIT);
  const [description, setDescription] = useState('');

  const [fetchError, setFetchError] = useState(false);
  const [noPledgeClass, setNoPledgeClass] = useState(false);
  const [submitErrors, setSubmitErrors] = useState({});

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [meritedPledge, setMeritedPledge] = useState('');

  useEffect(() => {
    if (didMount) {
      if (CURR_PLEDGE_CLASS) {
        fetchAllPledges(CURR_PLEDGE_CLASS);
      } else {
        setNoPledgeClass(true);
      }
    } else {
      setDidMount(true);
    }
  }, [didMount]);

  useEffect(() => {
    if (props.merit.wasSubmitted && props.merit.meritedPledge) {
      setWasSubmitted(true);
      setMeritedPledge(props.merit.meritedPledge);
      setSubmitErrors({});
    } else if (props.errors) {
      setSubmitErrors(props.errors);
    }
  }, [props.merit.wasSubmitted, props.merit.meritedPledge, props.errors]);

  const fetchAllPledges = async (currentPledgeClass) => {
    try {
      const apiResponse = await axios.get(
        `/api/brothers/${currentPledgeClass}`
      );
      setPledges(apiResponse.data.currentPledges);
      setSelectedPledge(Object.keys(apiResponse.data.currentPledges)[0]);
      setFetchError(false);
    } catch (error) {
      setFetchError(true);
    }
  };

  const redirectToDashboard = () => {
    navigate('/portal/dashboard');
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'pledges':
        setSelectedPledge(event.target.value);
        break;
      case 'merit':
      case 'demerit':
        if (event.target.checked) {
          setOperation(event.target.value);
        }
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      default:
        console.error('Unknown input ID');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const meritData = {
      pledgeName: selectedPledge,
      issuerName: props.auth.user.name,
      pledgeID: pledges[selectedPledge].id,
      issuerID: props.auth.user.id,
      operation,
      description,
    };
    props.submitMeritRequest(meritData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section className={meritFormStyles.root}>
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
                <b>Submit</b> a merit/demerit
              </h1>
              {/* Success message when a pledge is merited/demerited */}
              {wasSubmitted && (
                <p>Merit request for {meritedPledge} submitted!</p>
              )}
              {noPledgeClass ? (
                <div>
                  <p>No pledge class at the moment</p>
                </div>
              ) : fetchError ? (
                <div>
                  <p>Cannot seem to fetch list of all pledges</p>
                </div>
              ) : (
                <form noValidate onSubmit={(event) => handleSubmit(event)}>
                  <div className="form-group">
                    <label htmlFor="pledges">Pledges</label>
                    <select
                      id="pledges"
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.pledges}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.pledges,
                      })}
                    >
                      {Object.keys(pledges).map((pledgeName) => (
                        <option key={pledges[pledgeName].id}>
                          {pledgeName}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">
                      {submitErrors.major}
                    </span>
                  </div>
                  <div className="form-group">
                    <div className="form-check form-check-inline">
                      <input
                        checked={operation === MeritOperationEnum.MERIT}
                        id="merit"
                        onChange={(event) => handleChange(event)}
                        type="radio"
                        value={MeritOperationEnum.MERIT}
                        name="meritRadioButton"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="merit">
                        Merit
                      </label>
                      <input
                        checked={operation === MeritOperationEnum.DEMERIT}
                        id="demerit"
                        onChange={(event) => handleChange(event)}
                        type="radio"
                        value={MeritOperationEnum.DEMERIT}
                        name="meritRadioButton"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="demerit">
                        Demerit
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      placeholder="Enter description"
                      onChange={(event) => handleChange(event)}
                      error={submitErrors.description}
                      className={classnames('form-control', {
                        'is-invalid': submitErrors.description,
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

MeritForm.propTypes = {
  submitMeritRequest: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    wasDispatched: PropTypes.bool,
    meritedPledge: PropTypes.string,
  }),
  merit: PropTypes.shape({
    wasSubmitted: PropTypes.bool,
    meritedPledge: PropTypes.string,
  }),
  errors: PropTypes.shape({
    description: PropTypes.string,
  }),
};

MeritForm.defaultProps = {
  auth: {},
  merit: {},
  errors: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
  merit: reduxState.merit,
  errors: reduxState.errors,
});

export default connect(mapStateToProps, { submitMeritRequest })(MeritForm);
