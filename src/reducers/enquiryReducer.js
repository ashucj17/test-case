import {
  SUBMIT_ENQUIRY,
  SUBMIT_ENQUIRY_SUCCESS,
  SUBMIT_ENQUIRY_FAILURE,
  FETCH_ENQUIRIES,
  FETCH_ENQUIRIES_SUCCESS,
  FETCH_ENQUIRIES_FAILURE
} from '../actions/types';

const initialState = {
  enquiries: [],
  submitting: false,
  loading: false,
  error: null,
  submitSuccess: false
};

const enquiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ENQUIRY:
      return {
        ...state,
        submitting: true,
        submitSuccess: false,
        error: null
      };
    
    case SUBMIT_ENQUIRY_SUCCESS:
      return {
        ...state,
        enquiries: [...state.enquiries, action.payload],
        submitting: false,
        submitSuccess: true,
        error: null
      };
    
    case SUBMIT_ENQUIRY_FAILURE:
      return {
        ...state,
        submitting: false,
        submitSuccess: false,
        error: action.payload
      };
    
    case FETCH_ENQUIRIES:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_ENQUIRIES_SUCCESS:
      return {
        ...state,
        enquiries: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_ENQUIRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default enquiryReducer;