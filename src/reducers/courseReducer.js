import {
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  SET_SELECTED_COURSE,
  CLEAR_SELECTED_COURSE
} from '../actions/types';

const initialState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case SET_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: action.payload
      };
    
    case CLEAR_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: null
      };
    
    default:
      return state;
  }
};

export default courseReducer;