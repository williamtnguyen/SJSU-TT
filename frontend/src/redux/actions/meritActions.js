import axios from 'axios';

import { MERIT_PLEDGE, GET_ERRORS, DISPATCH_REQUEST } from './types';

/**
 * Merit request action
 * @param meritData form inputs
 */
// eslint-disable-next-line import/prefer-default-export
export const submitMeritRequest = (meritData) => (dispatch) => {
  axios
    .post('/api/merits', meritData)
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
    .put('/api/merits', dispatchData)
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

const updateDispatchSuccessMessage = (pledgeName) => {
  return {
    type: DISPATCH_REQUEST,
    payload: {
      pledgeName,
    },
  };
};
