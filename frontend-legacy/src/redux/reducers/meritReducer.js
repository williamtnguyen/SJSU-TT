import {
  MERIT_PLEDGE,
  DISPATCH_REQUEST,
  DELETE_REQUEST,
} from '../actions/types';

const initialState = {
  wasSubmitted: false,
  meritedPledge: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MERIT_PLEDGE:
      return {
        ...state,
        wasSubmitted: true,
        meritedPledge: action.payload.pledgeName,
      };
    case DISPATCH_REQUEST:
      return {
        ...state,
        wasDispatched: action.payload.pledgeName !== null,
        dispatchedRequestPledge: action.payload.pledgeName,
      };
    case DELETE_REQUEST:
      return {
        ...state,
        wasDeleted: action.payload.pledgeName !== null,
        deletedRequestPledge: action.payload.pledgeName,
      };
    default:
      return state;
  }
}
