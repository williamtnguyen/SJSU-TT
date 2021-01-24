import axios from 'axios';

import { MERIT_PLEDGE, GET_ERRORS } from './types';

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
      dispatch(updateMeritRequestSuccessMessage(response.data.pledgeName));
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
