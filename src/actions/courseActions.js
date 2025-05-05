import {
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  SET_SELECTED_COURSE,
  CLEAR_SELECTED_COURSE
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: FETCH_COURSES });
  
  try {
    const response = await fetch(`${API_URL}/courses`);
    
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

export const setSelectedCourse = (course) => {
  return {
    type: SET_SELECTED_COURSE,
    payload: course
  };
};

export const clearSelectedCourse = () => {
  return {
    type: CLEAR_SELECTED_COURSE
  };
};