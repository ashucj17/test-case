import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import {
  fetchCourses,
  setSelectedCourse,
  clearSelectedCourse
} from '../../actions/courseActions';
import {
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  SET_SELECTED_COURSE,
  CLEAR_SELECTED_COURSE
} from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('course actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('creates FETCH_COURSES_SUCCESS when fetching courses has been done', async () => {
    const courses = [
      { id: 1, title: 'React Course' },
      { id: 2, title: 'Node.js Course' }
    ];
    
    fetchMock.mockResponseOnce(JSON.stringify(courses));

    const expectedActions = [
      { type: FETCH_COURSES },
      { type: FETCH_COURSES_SUCCESS, payload: courses }
    ];
    
    const store = mockStore({ courses: [] });

    await store.dispatch(fetchCourses());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_COURSES_FAILURE when fetching courses fails', async () => {
    fetchMock.mockReject(new Error('Network error'));

    const expectedActions = [
      { type: FETCH_COURSES },
      { type: FETCH_COURSES_FAILURE, payload: 'Network error' }
    ];
    
    const store = mockStore({ courses: [] });

    await store.dispatch(fetchCourses());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SET_SELECTED_COURSE action', () => {
    const course = { id: 1, title: 'React Course' };
    const expectedAction = {
      type: SET_SELECTED_COURSE,
      payload: course
    };
    
    expect(setSelectedCourse(course)).toEqual(expectedAction);
  });

  it('creates CLEAR_SELECTED_COURSE action', () => {
    const expectedAction = { type: CLEAR_SELECTED_COURSE };
    expect(clearSelectedCourse()).toEqual(expectedAction);
  });
});