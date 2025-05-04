import {
    FETCH_COURSES,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    SET_SELECTED_COURSE,
    CLEAR_SELECTED_COURSE
  } from './types';
  
  // Action to fetch courses from API
  export const fetchCourses = () => async (dispatch) => {
    dispatch({ type: FETCH_COURSES });
    
    try {
      const response = await fetch('http://localhost:3001/courses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data = await response.json();
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSES_FAILURE,
        payload: error.message
      });
    }
  };
  
  // Action to set selected course for enquiry
  export const setSelectedCourse = (course) => {
    return {
      type: SET_SELECTED_COURSE,
      payload: course
    };
  };
  
  // Action to clear selected course
  export const clearSelectedCourse = () => {
    return {
      type: CLEAR_SELECTED_COURSE
    };
  };