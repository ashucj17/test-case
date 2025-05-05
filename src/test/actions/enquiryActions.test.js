import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import {
  submitEnquiry,
  fetchEnquiries
} from '../../actions/enquiryActions';
import {
  SUBMIT_ENQUIRY,
  SUBMIT_ENQUIRY_SUCCESS,
  SUBMIT_ENQUIRY_FAILURE,
  FETCH_ENQUIRIES,
  FETCH_ENQUIRIES_SUCCESS,
  FETCH_ENQUIRIES_FAILURE
} from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('enquiry actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock Date.now for consistent createdAt values
    jest.spyOn(Date.prototype, 'toISOString').mockImplementation(() => '2023-01-01T00:00:00.000Z');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates SUBMIT_ENQUIRY_SUCCESS when submitting enquiry succeeds', async () => {
    const enquiryData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      courseId: 1
    };
    
    const responseData = {
      ...enquiryData,
      id: 1,
      createdAt: '2023-01-01T00:00:00.000Z'
    };
    
    fetchMock.mockResponseOnce(JSON.stringify(responseData));

    const expectedActions = [
      { type: SUBMIT_ENQUIRY },
      { type: SUBMIT_ENQUIRY_SUCCESS, payload: responseData }
    ];
    
    const store = mockStore({ enquiries: [] });

    await store.dispatch(submitEnquiry(enquiryData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SUBMIT_ENQUIRY_FAILURE when submitting enquiry fails', async () => {
    const enquiryData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    fetchMock.mockReject(new Error('Network error'));

    const expectedActions = [
      { type: SUBMIT_ENQUIRY },
      { type: SUBMIT_ENQUIRY_FAILURE, payload: 'Network error' }
    ];
    
    const store = mockStore({ enquiries: [] });

    await store.dispatch(submitEnquiry(enquiryData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_ENQUIRIES_SUCCESS when fetching enquiries succeeds', async () => {
    const enquiries = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    
    fetchMock.mockResponseOnce(JSON.stringify(enquiries));

    const expectedActions = [
      { type: FETCH_ENQUIRIES },
      { type: FETCH_ENQUIRIES_SUCCESS, payload: enquiries }
    ];
    
    const store = mockStore({ enquiries: [] });

    await store.dispatch(fetchEnquiries());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_ENQUIRIES_FAILURE when fetching enquiries fails', async () => {
    fetchMock.mockReject(new Error('Network error'));

    const expectedActions = [
      { type: FETCH_ENQUIRIES },
      { type: FETCH_ENQUIRIES_FAILURE, payload: 'Network error' }
    ];
    
    const store = mockStore({ enquiries: [] });

    await store.dispatch(fetchEnquiries());
    expect(store.getActions()).toEqual(expectedActions);
  });
});