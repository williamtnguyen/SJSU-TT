import { MERIT_PLEDGE, DISPATCH_REQUEST } from '../actions/types';

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
    default:
      return state;
  }
}
