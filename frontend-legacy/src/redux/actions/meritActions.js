import axios from 'axios';

import {
  MERIT_PLEDGE,
  GET_ERRORS,
  DISPATCH_REQUEST,
  DELETE_REQUEST,
} from './types';

/**
 * Merit request action
 * @param meritData form inputs
 */
// eslint-disable-next-line import/prefer-default-export
export const submitMeritRequest = (meritData) => (dispatch) => {
  axios
    .post(`${process.env.BACKEND_API_URL}/api/merits`, meritData)
    .then((response) => {
      console.log(response);
      dispatch(
        updateMeritRequestSuccessMessage(response.data.storedMerit.pledgeName)
      );
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

const updateMeritRequestSuccessMessage = (pledgeName) => {
  return {
    type: MERIT_PLEDGE,
    payload: {
      pledgeName,
    },
  };
};

/**
 * Dispatch merit request
 * @param dispatchData  { isMeritApproved, meritPayload }
 */
export const dispatchMeritRequest = (dispatchData) => (dispatch) => {
  axios
    .put(`${process.env.BACKEND_API_URL}/api/merits`, dispatchData)
    .then((response) => {
      console.log(response);
      dispatch(updateDispatchSuccessMessage(response.data.pledgeName));
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Helper function that changes global state of
// 'isDispatched' to false and 'dispatchedRequestPledge' to null
// so MeritManager comp knows when they become true
export const clearLastDispatchedRequest = () => (dispatch) => {
  dispatch(updateDispatchSuccessMessage(null));
};

const updateDispatchSuccessMessage = (pledgeName) => {
  return {
    type: DISPATCH_REQUEST,
    payload: {
      pledgeName,
    },
  };
};

/**
 * Delete merit request
 * @param meritRequestID the mongoDB _id field for merit request document
 * @param pledgeName the name of the pledge to show success message on deletion
 */
export const deleteMeritRequest = (meritRequestID, pledgeName) => (
  dispatch
) => {
  axios
    .delete(`${process.env.BACKEND_API_URL}/api/merits/${meritRequestID}`)
    .then((response) => {
      console.log(response);
      dispatch(updateDeleteSuccessMessage(pledgeName));
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Helper function that changes global state of
// 'isDeleted' to false and 'deletedRequestPledge' to null
// so MeritManager comp knows when they become true
export const clearLastDeletedRequest = () => (dispatch) => {
  dispatch(updateDeleteSuccessMessage(null));
};

const updateDeleteSuccessMessage = (pledgeName) => {
  return {
    type: DELETE_REQUEST,
    payload: {
      pledgeName,
    },
  };
};
