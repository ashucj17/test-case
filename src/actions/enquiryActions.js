import {
    SUBMIT_ENQUIRY,
    SUBMIT_ENQUIRY_SUCCESS,
    SUBMIT_ENQUIRY_FAILURE,
    FETCH_ENQUIRIES,
    FETCH_ENQUIRIES_SUCCESS,
    FETCH_ENQUIRIES_FAILURE
  } from './types';
  
  // Action to submit an enquiry
  export const submitEnquiry = (enquiryData) => async (dispatch) => {
    dispatch({ type: SUBMIT_ENQUIRY });
    
    try {
      const response = await fetch('http://localhost:3001/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...enquiryData,
          createdAt: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }
      
      const data = await response.json();
      dispatch({
        type: SUBMIT_ENQUIRY_SUCCESS,
        payload: data
      });
      
      return true;
    } catch (error) {
      dispatch({
        type: SUBMIT_ENQUIRY_FAILURE,
        payload: error.message
      });
      
      return false;
    }
  };
  
  // Action to fetch all enquiries
  export const fetchEnquiries = () => async (dispatch) => {
    dispatch({ type: FETCH_ENQUIRIES });
    
    try {
      const response = await fetch('http://localhost:3001/enquiries');
      
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      
      const data = await response.json();
      dispatch({
        type: FETCH_ENQUIRIES_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_ENQUIRIES_FAILURE,
        payload: error.message
      });
    }
  };