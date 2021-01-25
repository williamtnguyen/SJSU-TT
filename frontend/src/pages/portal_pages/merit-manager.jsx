import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';
import {
  dispatchMeritRequest,
  clearLastDispatchedRequest,
} from '../../redux/actions/meritActions';
import meritManagerStyles from './merit-manager.module.scss';

import {
  MeritManagerTabEnum,
  MeritRequestDispatchEnum,
} from '../../util/enums/merit-enums';

const MeritRequestTable = ({
  allMeritRequests,
  selectedTab,
  setSelectedTab,
  setSelectedMeritRequest,
}) => {
  const setSelectedTabWrapper = (tab) => {
    setSelectedTab(tab);
    setSelectedMeritRequest({});
  };

  return (
    <div className="col-lg-6 col-md-1">
      <div className="btn-group mb-3" role="group">
        {Object.values(MeritManagerTabEnum).map((tab) => {
          if (tab === selectedTab) {
            return (
              <button
                key={tab}
                onClick={() => setSelectedTabWrapper(tab)}
                type="button"
                className="btn btn-warning"
              >
                {tab}
              </button>
            );
          }
          return (
            <button
              key={tab}
              onClick={() => setSelectedTabWrapper(tab)}
              type="button"
              className="btn btn-light"
            >
              {tab}
            </button>
          );
        })}
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Pledge</th>
            <th scope="col">Issuer</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {allMeritRequests[selectedTab.toLowerCase()].map((meritRequest) => (
            <tr
              // eslint-disable-next-line no-underscore-dangle
              key={meritRequest._id}
              onClick={() => setSelectedMeritRequest(meritRequest)}
              className={meritManagerStyles.merit__request__row}
            >
              <td>{meritRequest.pledgeName}</td>
              <td>{meritRequest.issuerName}</td>
              <td>{meritRequest.operation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MeritRequestSummary = ({
  selectedMeritRequest,
  selectedTab,
  handleDispatch,
  wasDispatched,
  dispatchedRequestPledge,
}) => {
  const [noSelectionError, setNoSelectionError] = useState(false);

  const isEmpty = (object) => {
    return Object.values(object).length === 0;
  };

  const handleDispatchWrapper = (event) => {
    if (!isEmpty(selectedMeritRequest)) {
      setNoSelectionError(false);
      handleDispatch(event);
    } else {
      setNoSelectionError(true);
    }
  };

  return (
    <div className="col-lg-6 col-md-1">
      {noSelectionError && (
        <p className={meritManagerStyles.error__message}>
          Nothing is selected. Cannot dispatch request.
        </p>
      )}
      {wasDispatched && (
        <p>
          Merit request for {dispatchedRequestPledge} successfully dispatched.
        </p>
      )}
      <div className={meritManagerStyles.merit__request__summary}>
        <h3 className="mb-3">Selected Merit Request:</h3>
        {isEmpty(selectedMeritRequest) ? (
          <p>No merit request selected</p>
        ) : (
          <div>
            <div className={meritManagerStyles.merit__request__summary__item}>
              <h6>Pledge Name:</h6>
              <span>{selectedMeritRequest.pledgeName}</span>
            </div>
            <div className={meritManagerStyles.merit__request__summary__item}>
              <h6>Issuer Name:</h6>
              <span>{selectedMeritRequest.issuerName}</span>
            </div>
            <div className={meritManagerStyles.merit__request__summary__item}>
              <h6>Operation:</h6>
              <span>{selectedMeritRequest.operation}</span>
            </div>
            <div className={meritManagerStyles.merit__request__summary__item}>
              <h6>Description:</h6>
              <span>{selectedMeritRequest.description}</span>
            </div>
            <div className={meritManagerStyles.merit__request__summary__item}>
              <h6>Status:</h6>
              <span>
                {selectedMeritRequest.isDispatched ? 'Dispatched' : 'Pending'}
              </span>
            </div>
          </div>
        )}
      </div>
      {selectedTab === MeritManagerTabEnum.PENDING && (
        <div className={meritManagerStyles.dispatch__button__group}>
          <button
            onClick={(event) => handleDispatchWrapper(event)}
            id={MeritRequestDispatchEnum.APPROVE}
            type="button"
            className={`btn btn-success ${meritManagerStyles.dispatch__button}`}
          >
            Approve Merit Request
          </button>
          <button
            onClick={(event) => handleDispatchWrapper(event)}
            id={MeritRequestDispatchEnum.DISAPPROVE}
            type="button"
            className={`btn btn-danger ${meritManagerStyles.dispatch__button}`}
          >
            Disapprove Merit Request
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Parent component
 * @param {*} props stuff from redux
 */
const MeritManager = (props) => {
  const [didMount, setDidMount] = useState(false);
  const [allMeritRequests, setAllMeritRequests] = useState({
    pending: [],
    dispatched: [],
  });
  const [selectedTab, setSelectedTab] = useState(MeritManagerTabEnum.PENDING);
  const [selectedMeritRequest, setSelectedMeritRequest] = useState({});

  const [wasDispatched, setWasDispatched] = useState(false);
  const [dispatchedRequestPledge, setDispatchedRequestPledge] = useState('');

  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (didMount) {
      getMeritRequests();

      if (props.merit.wasDispatched && props.merit.dispatchedRequestPledge) {
        setWasDispatched(true);
        setDispatchedRequestPledge(props.merit.dispatchedRequestPledge);
        setSelectedMeritRequest({});
      }
    } else {
      setDidMount(true);
    }
  }, [
    didMount,
    props.merit.wasDispatched,
    props.merit.dispatchedRequestPledge,
  ]);

  const getMeritRequests = async () => {
    try {
      const apiResponse = await axios.get('/api/merits');
      setAllMeritRequests(apiResponse.data);
    } catch (error) {
      setFetchError(true);
    }
  };

  // Handler function for approving/disapproving merit requests
  const handleDispatch = (event) => {
    const isMeritApproved =
      event.target.id === MeritRequestDispatchEnum.APPROVE;
    const dispatchData = {
      isMeritApproved,
      meritPayload: selectedMeritRequest,
    };
    props.dispatchMeritRequest(dispatchData);
  };

  const setSelectedMeritRequestWrapper = (meritRequest) => {
    setSelectedMeritRequest(meritRequest);
    props.clearLastDispatchedRequest();
  };

  const redirectToDashboard = () => {
    navigate('/portal/dashboard');
  };

  return (
    <div className={meritManagerStyles.root}>
      <div
        className="container"
        style={{ maxWidth: '80%', marginTop: '50px', marginBottom: '50px' }}
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
              <b>Merit Manager</b> for pledge parents
            </h1>
            {fetchError ? (
              <p>Cannot fetch merit requests from backend.</p>
            ) : (
              <div className="row">
                <MeritRequestTable
                  allMeritRequests={allMeritRequests}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  selectedMeritRequest={selectedMeritRequest}
                  setSelectedMeritRequest={setSelectedMeritRequestWrapper}
                />
                <MeritRequestSummary
                  selectedMeritRequest={selectedMeritRequest}
                  selectedTab={selectedTab}
                  handleDispatch={handleDispatch}
                  wasDispatched={wasDispatched}
                  dispatchedRequestPledge={dispatchedRequestPledge}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MeritRequestTable.propTypes = {
  allMeritRequests: PropTypes.shape({
    pending: PropTypes.arrayOf(
      PropTypes.shape({
        pledgeName: PropTypes.string,
        issuerName: PropTypes.string,
        pledgeID: PropTypes.string,
        issuerID: PropTypes.string,
        operation: PropTypes.string,
        description: PropTypes.string,
        isDispatched: PropTypes.bool,
      })
    ),
    dispatched: PropTypes.arrayOf(
      PropTypes.shape({
        pledgeName: PropTypes.string,
        issuerName: PropTypes.string,
        pledgeID: PropTypes.string,
        issuerID: PropTypes.string,
        operation: PropTypes.string,
        description: PropTypes.string,
        isDispatched: PropTypes.bool,
      })
    ),
  }),
  selectedTab: PropTypes.string,
  setSelectedTab: PropTypes.func,
  setSelectedMeritRequest: PropTypes.func,
};

MeritRequestTable.defaultProps = {
  allMeritRequests: {},
  selectedTab: '',
  setSelectedTab: () => {},
  setSelectedMeritRequest: () => {},
};

MeritRequestSummary.propTypes = {
  selectedMeritRequest: PropTypes.shape({
    pledgeName: PropTypes.string,
    issuerName: PropTypes.string,
    pledgeID: PropTypes.string,
    issuerID: PropTypes.string,
    operation: PropTypes.string,
    description: PropTypes.string,
    isDispatched: PropTypes.bool,
  }),
  selectedTab: PropTypes.string,
  handleDispatch: PropTypes.func,
  wasDispatched: PropTypes.bool,
  dispatchedRequestPledge: PropTypes.string,
};

MeritRequestSummary.defaultProps = {
  selectedMeritRequest: {},
  selectedTab: MeritManagerTabEnum.PENDING,
  handleDispatch: () => {},
  wasDispatched: false,
  dispatchedRequestPledge: '',
};

MeritManager.propTypes = {
  dispatchMeritRequest: PropTypes.func.isRequired,
  clearLastDispatchedRequest: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  merit: PropTypes.shape({
    wasDispatched: PropTypes.bool,
    dispatchedRequestPledge: PropTypes.string,
  }),
};

MeritManager.defaultProps = {
  auth: {},
  merit: {},
};

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth,
  merit: reduxState.merit,
});

export default connect(mapStateToProps, {
  dispatchMeritRequest,
  clearLastDispatchedRequest,
})(MeritManager);
