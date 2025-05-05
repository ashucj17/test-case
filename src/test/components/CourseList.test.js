import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CourseList from '../../components/CourseList';
import * as courseActions from '../../actions/courseActions';

// Mock the actions
jest.mock('../../actions/courseActions', () => ({
  fetchCourses: jest.fn(() => ({ type: 'FETCH_COURSES' })),
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

describe('CourseList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      courses: {
        courses: [
          { id: 1, title: 'React Course', description: 'Learn React', instructor: 'John', duration: '8 weeks', price: 299 },
          { id: 2, title: 'Node.js Course', description: 'Learn Node.js', instructor: 'Jane', duration: '10 weeks', price: 349 }
        ],
        loading: false,
        error: null,
        selectedCourse: null
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render course list', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('Available Courses')).toBeInTheDocument();
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.getByText('Node.js Course')).toBeInTheDocument();
    expect(screen.getAllByText('Enquire Now').length).toBe(2);
  });

  it('should show loading state', () => {
    const loadingStore = mockStore({
      courses: {
        courses: [],
        loading: true,
        error: null,
        selectedCourse: null
      }
    });

    render(
      <Provider store={loadingStore}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const errorStore = mockStore({
      courses: {
        courses: [],
        loading: false,
        error: 'Failed to load courses',
        selectedCourse: null
      }
    });

    render(
      <Provider store={errorStore}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText('Failed to load courses')).toBeInTheDocument();
  });

  it('should dispatch fetchCourses on mount', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(courseActions.fetchCourses).toHaveBeenCalled();
  });

  it('should show EnquiryForm when a course is selected', () => {
    const storeWithSelectedCourse = mockStore({
      courses: {
        courses: [
          { id: 1, title: 'React Course', description: 'Learn React', instructor: 'John', duration: '8 weeks', price: 299 },
          { id: 2, title: 'Node.js Course', description: 'Learn Node.js', instructor: 'Jane', duration: '10 weeks', price: 349 }
        ],
        loading: false,
        error: null,
        selectedCourse: { id: 1, title: 'React Course' }
      }
    });

    render(
      <Provider store={storeWithSelectedCourse}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByTestId('enquiry-form')).toBeInTheDocument();
    expect(screen.getByText('Enquiry form for: React Course')).toBeInTheDocument();
  });

  it('should dispatch setSelectedCourse when "Enquire Now" is clicked', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const enquireButtons = screen.getAllByText('Enquire Now');
    fireEvent.click(enquireButtons[0]);

    expect(courseActions.setSelectedCourse).toHaveBeenCalledWith({
      id: 1, 
      title: 'React Course', 
      description: 'Learn React', 
      instructor: 'John', 
      duration: '8 weeks', 
      price: 299
    });
  });
});