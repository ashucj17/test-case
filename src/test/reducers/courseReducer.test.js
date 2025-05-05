import courseReducer from '../../reducers/courseReducer';
import {
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  SET_SELECTED_COURSE,
  CLEAR_SELECTED_COURSE
} from '../../actions/types';

describe('courseReducer', () => {
  const initialState = {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COURSES', () => {
    const action = { type: FETCH_COURSES };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_COURSES_SUCCESS', () => {
    const courses = [
      { id: 1, title: 'React Course' },
      { id: 2, title: 'Node.js Course' }
    ];
    const action = { 
      type: FETCH_COURSES_SUCCESS,
      payload: courses
    };
    const expectedState = {
      ...initialState,
      courses,
      loading: false,
      error: null
    };
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_COURSES_FAILURE', () => {
    const error = 'Failed to fetch courses';
    const action = { 
      type: FETCH_COURSES_FAILURE,
      payload: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error
    };
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SELECTED_COURSE', () => {
    const course = { id: 1, title: 'React Course' };
    const action = { 
      type: SET_SELECTED_COURSE,
      payload: course
    };
    const expectedState = {
      ...initialState,
      selectedCourse: course
    };
    expect(courseReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_SELECTED_COURSE', () => {
    const stateWithSelectedCourse = {
      ...initialState,
      selectedCourse: { id: 1, title: 'React Course' }
    };
    const action = { type: CLEAR_SELECTED_COURSE };
    expect(courseReducer(stateWithSelectedCourse, action)).toEqual(initialState);
  });
});