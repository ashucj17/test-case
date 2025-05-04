import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import enquiryReducer from './enquiryReducer';

export default combineReducers({
  courses: courseReducer,
  enquiries: enquiryReducer
});