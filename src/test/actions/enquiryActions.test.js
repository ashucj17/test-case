import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../actions/enquiryActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Enquiry Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates SUBMIT_ENQUIRY_SUCCESS when submitting enquiry is successful', () => {
    const enquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      courseId: 1,
      courseTitle: 'Test Course'
    };
    
    const responseData = { id: 1, ...enquiry };
    
    // Mock the date to ensure consistent test results
    const realDate = Date;
    const mockDate = new Date('2023-01-01T00:00:00Z');
    global.Date = class extends Date {
      constructor() {
        return mockDate;
      }
      
      static now() {
        return mockDate.getTime();
      }
      
      toISOString() {
        return '2023-01-01T00:00:00Z';
      }
    };

    fetchMock.postOnce('http://localhost:3001/enquiries', {
      body: responseData,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.SUBMIT_ENQUIRY },
      { type: types.SUBMIT_ENQUIRY_SUCCESS, payload: responseData }
    ];

    const store = mockStore({ enquiries: [] });

    return store.dispatch(actions.submitEnquiry(enquiry)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      // Restore the original Date
      global.Date = realDate;
    });
  });

  it('creates SUBMIT_ENQUIRY_FAILURE when submitting enquiry fails', () => {
    const enquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    };

    fetchMock.postOnce('http://localhost:3001/enquiries', {
      status: 500,
      throws: new Error('Failed to submit enquiry')
    });

    const expectedActions = [
      { type: types.SUBMIT_ENQUIRY },
      { type: types.SUBMIT_ENQUIRY_FAILURE, payload: 'Failed to submit enquiry' }
    ];

    const store = mockStore({ enquiries: [] });

    return store.dispatch(actions.submitEnquiry(enquiry)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_ENQUIRIES_SUCCESS when fetching enquiries is successful', () => {
    const enquiries = [
      { id: 1, name: 'John Doe', courseTitle: 'Test Course 1' },
      { id: 2, name: 'Jane Smith', courseTitle: 'Test Course 2' }
    ];

    fetchMock.getOnce('http://localhost:3001/enquiries', {
      body: enquiries,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.FETCH_ENQUIRIES },
      { type: types.FETCH_ENQUIRIES_SUCCESS, payload: enquiries }
    ];

    const store = mockStore({ enquiries: [] });

    return store.dispatch(actions.fetchEnquiries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_ENQUIRIES_FAILURE when fetching enquiries fails', () => {
    fetchMock.getOnce('http://localhost:3001/enquiries', {
      status: 404,
      throws: new Error('Failed to fetch enquiries')
    });

    const expectedActions = [
      { type: types.FETCH_ENQUIRIES },
      { type: types.FETCH_ENQUIRIES_FAILURE, payload: 'Failed to fetch enquiries' }
    ];

    const store = mockStore({ enquiries: [] });

    return store.dispatch(actions.fetchEnquiries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});