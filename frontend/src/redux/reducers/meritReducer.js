import { MERIT_PLEDGE } from '../actions/types';

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
    default:
      return state;
  }
}
