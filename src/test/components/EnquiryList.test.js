import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EnquiryList from '../../components/EnquiryList';
import * as enquiryActions from '../../actions/enquiryActions';
import * as courseActions from '../../actions/courseActions';

// Mock the actions
jest.mock('../../actions/enquiryActions', () => ({
  fetchEnquiries: jest.fn(() => ({ type: 'FETCH_ENQUIRIES' }))
}));

jest.mock('../../actions/courseActions', () => ({
  setSelectedCourse: jest.fn((course) => ({ 
    type: 'SET_SELECTED_COURSE',
    payload: course
  })),
  clearSelectedCourse: jest.fn(() => ({ type: 'CLEAR_SELECTED_COURSE' }))
}));

// Mock EnquiryForm component
jest.mock('../../components/EnquiryForm', () => {
  return function DummyEnquiryForm({ course, onClose }) {
    return (
      <div data-testid="enquiry-form">
        <p>Enquiry form for: {course.title}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

const mockStore = configureStore([thunk]);

describe('EnquiryList Component', () => {
  let store;
  const mockDate = new Date('2023-01-01T12:00:00Z').toISOString();

  beforeEach(() => {
    store = mockStore({
      enquiries: {
        enquiries: [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', courseTitle: 'React Course', createdAt: mockDate },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', courseTitle: 'Node.js Course', createdAt: mockDate }
        ],
        loading: false,
        error: null
      },
      courses: {
        selectedCourse: null
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render enquiry list', () => {
    render(
      <Provider store={store}>
        <EnquiryList />
      </Provider>
    );

    expect(screen.getByText('Course Enquiries')).toBeInTheDocument();
    expect(screen.getByText('Enquiry for: React Course')).toBeInTheDocument();
    expect(screen.getByText('Enquiry for: Node.js Course')).toBeInTheDocument();
    expect(screen.getByText('New Enquiry')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    const loadingStore = mockStore({
      enquiries: {
        enquiries: [],
        loading: true,
        error: null
      },
      courses: {
        selectedCourse: null
      }
    });

    render(
      <Provider store={loadingStore}>
        <EnquiryList />
      </Provider>
    );

    expect(screen.getByText('Loading enquiries...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const errorStore = mockStore({
      enquiries: {
        enquiries: [],
        loading: false,
        error: 'Failed to load enquiries'
      },
      courses: {
        selectedCourse: null
      }
    });

    render(
      <Provider store={errorStore}>
        <EnquiryList />
      </Provider>
    );

    expect(screen.getByText('Failed to load enquiries')).toBeInTheDocument();
  });

  it('should dispatch fetchEnquiries on mount', () => {
    render(
      <Provider store={store}>
        <EnquiryList />
      </Provider>
    );

    expect(enquiryActions.fetchEnquiries).toHaveBeenCalled();
  });

  it('should show message when no enquiries exist', () => {
    const emptyStore = mockStore({
      enquiries: {
        enquiries: [],
        loading: false,
        error: null
      },
      courses: {
        selectedCourse: null
      }
    });

    render(
      <Provider store={emptyStore}>
        <EnquiryList />
      </Provider>
    );

    expect(screen.getByText('No enquiries yet. Use the "New Enquiry" button to submit one.')).toBeInTheDocument();
  });

  it('should show EnquiryForm when a course is selected', () => {
    const storeWithSelectedCourse = mockStore({
      enquiries: {
        enquiries: [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', courseTitle: 'React Course', createdAt: mockDate }
        ],
        loading: false,
        error: null
      },
      courses: {
        selectedCourse: { id: null, title: 'General Enquiry' }
      }
    });

    render(
      <Provider store={storeWithSelectedCourse}>
        <EnquiryList />
      </Provider>
    );

    expect(screen.getByTestId('enquiry-form')).toBeInTheDocument();
    expect(screen.getByText('Enquiry form for: General Enquiry')).toBeInTheDocument();
  });

  it('should dispatch setSelectedCourse when "New Enquiry" button is clicked', () => {
    render(
      <Provider store={store}>
        <EnquiryList />
      </Provider>
    );

    fireEvent.click(screen.getByText('New Enquiry'));

    expect(courseActions.setSelectedCourse).toHaveBeenCalledWith({
      id: null,
      title: 'General Enquiry'
    });
  });
});