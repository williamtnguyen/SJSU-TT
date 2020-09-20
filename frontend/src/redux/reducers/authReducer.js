import { SET_CURRENT_BROTHER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

/**
 * Returns whether or not an object is empty
 */
function isEmpty(object) {
  return Object.keys(object).length === 0;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_BROTHER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
