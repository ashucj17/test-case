import enquiryReducer from '../../reducers/enquiryReducer';
import {
  SUBMIT_ENQUIRY,
  SUBMIT_ENQUIRY_SUCCESS,
  SUBMIT_ENQUIRY_FAILURE,
  FETCH_ENQUIRIES,
  FETCH_ENQUIRIES_SUCCESS,
  FETCH_ENQUIRIES_FAILURE
} from '../../actions/types';

describe('enquiryReducer', () => {
  const initialState = {
    enquiries: [],
    submitting: false,
    loading: false,
    error: null,
    submitSuccess: false
  };

  it('should return the initial state', () => {
    expect(enquiryReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SUBMIT_ENQUIRY', () => {
    const action = { type: SUBMIT_ENQUIRY };
    const expectedState = {
      ...initialState,
      submitting: true,
      submitSuccess: false,
      error: null
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SUBMIT_ENQUIRY_SUCCESS', () => {
    const enquiry = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const action = { 
      type: SUBMIT_ENQUIRY_SUCCESS,
      payload: enquiry
    };
    const expectedState = {
      ...initialState,
      enquiries: [enquiry],
      submitting: false,
      submitSuccess: true,
      error: null
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SUBMIT_ENQUIRY_FAILURE', () => {
    const error = 'Failed to submit enquiry';
    const action = { 
      type: SUBMIT_ENQUIRY_FAILURE,
      payload: error
    };
    const expectedState = {
      ...initialState,
      submitting: false,
      submitSuccess: false,
      error
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ENQUIRIES', () => {
    const action = { type: FETCH_ENQUIRIES };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ENQUIRIES_SUCCESS', () => {
    const enquiries = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const action = { 
      type: FETCH_ENQUIRIES_SUCCESS,
      payload: enquiries
    };
    const expectedState = {
      ...initialState,
      enquiries,
      loading: false,
      error: null
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ENQUIRIES_FAILURE', () => {
    const error = 'Failed to fetch enquiries';
    const action = { 
      type: FETCH_ENQUIRIES_FAILURE,
      payload: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error
    };
    expect(enquiryReducer(initialState, action)).toEqual(expectedState);
  });
});
