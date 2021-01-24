import { combineReducers } from 'redux';
import brotherReducer from './brotherReducer';
import meritReducer from './meritReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: brotherReducer,
  merit: meritReducer,
  errors: errorReducer,
});
