import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path }) => <div data-testid={`route-${path.replace('/', '')}`} />,
  Link: ({ children, to }) => <a data-testid={`link-${to.replace('/', '')}`} href={to}>{children}</a>
}));

// Mock the CourseList and EnquiryList components
jest.mock('../../components/CourseList', () => () => <div data-testid="course-list">CourseList Component</div>);
jest.mock('../../components/EnquiryList', () => () => <div data-testid="enquiry-list">EnquiryList Component</div>);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('App Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      courses: {
        courses: [],
        loading: false,
        error: null,
        selectedCourse: null
      },
      enquiries: {
        enquiries: [],
        loading: false,
        error: null,
        submitting: false,
        submitSuccess: false
      }
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    // Check if navigation is rendered
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Enquiries')).toBeInTheDocument();
    
    // Check if router components are rendered
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    expect(screen.getByTestId('route-')).toBeInTheDocument(); // Root route
    expect(screen.getByTestId('route-enquiries')).toBeInTheDocument();
    
    // Check if links are rendered correctly
    expect(screen.getByTestId('link-')).toBeInTheDocument(); // Root link
    expect(screen.getByTestId('link-enquiries')).toBeInTheDocument();
  });
});