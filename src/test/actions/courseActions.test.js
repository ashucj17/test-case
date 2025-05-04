import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../actions/courseActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Course Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_COURSES_SUCCESS when fetching courses is successful', () => {
    const courses = [
      { id: 1, title: 'Test Course 1' },
      { id: 2, title: 'Test Course 2' }
    ];

    fetchMock.getOnce('http://localhost:3001/courses', {
      body: courses,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.FETCH_COURSES },
      { type: types.FETCH_COURSES_SUCCESS, payload: courses }
    ];

    const store = mockStore({ courses: [] });

    return store.dispatch(actions.fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_COURSES_FAILURE when fetching courses fails', () => {
    fetchMock.getOnce('http://localhost:3001/courses', {
      status: 404,
      throws: new Error('Failed to fetch courses')
    });

    const expectedActions = [
      { type: types.FETCH_COURSES },
      { type: types.FETCH_COURSES_FAILURE, payload: 'Failed to fetch courses' }
    ];

    const store = mockStore({ courses: [] });

    return store.dispatch(actions.fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_SELECTED_COURSE action', () => {
    const course = { id: 1, title: 'Test Course' };
    const expectedAction = {
      type: types.SET_SELECTED_COURSE,
      payload: course
    };

    expect(actions.setSelectedCourse(course)).toEqual(expectedAction);
  });

  it('creates CLEAR_SELECTED_COURSE action', () => {
    const expectedAction = {
      type: types.CLEAR_SELECTED_COURSE
    };

    expect(actions.clearSelectedCourse()).toEqual(expectedAction);
  });
});