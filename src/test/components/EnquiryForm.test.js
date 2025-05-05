import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EnquiryForm from '../../components/EnquiryForm';
import * as enquiryActions from '../../actions/enquiryActions';

// Mock the actions
jest.mock('../../actions/enquiryActions', () => ({
  submitEnquiry: jest.fn(() => ({ type: 'SUBMIT_ENQUIRY' }))
}));

const mockStore = configureStore([thunk]);

describe('EnquiryForm Component', () => {
  const mockCourse = { id: 1, title: 'React Course' };
  const mockOnClose = jest.fn();
  let store;

  beforeEach(() => {
    store = mockStore({
      enquiries: {
        submitting: false,
        submitSuccess: false,
        error: null
      }
    });
    jest.clearAllMocks();
  });

  it('should render enquiry form correctly', () => {
    render(
      <Provider store={store}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText('Enquire about: React Course')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Message (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Submit Enquiry')).toBeInTheDocument();
  });

  it('should show success message when submitSuccess is true', () => {
    const successStore = mockStore({
      enquiries: {
        submitting: false,
        submitSuccess: true,
        error: null
      }
    });

    render(
      <Provider store={successStore}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText('Thank you for your enquiry!')).toBeInTheDocument();
    expect(screen.getByText('We will get back to you soon.')).toBeInTheDocument();
  });

  it('should validate form and show error messages', async () => {
    render(
      <Provider store={store}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    // Submit form without filling required fields
    fireEvent.click(screen.getByText('Submit Enquiry'));

    // Check for validation error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    expect(enquiryActions.submitEnquiry).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    render(
      <Provider store={store}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    // Fill the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Message (Optional)'), { target: { value: 'Test message' } });

    // Submit form
    fireEvent.click(screen.getByText('Submit Enquiry'));

    // Check if submit action was called with correct data
    expect(enquiryActions.submitEnquiry).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'Test message',
      courseId: 1,
      courseTitle: 'React Course'
    });
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Provider store={store}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show submitting state when form is being submitted', () => {
    const submittingStore = mockStore({
      enquiries: {
        submitting: true,
        submitSuccess: false,
        error: null
      }
    });

    render(
      <Provider store={submittingStore}>
        <EnquiryForm course={mockCourse} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByText('Submitting...').disabled).toBe(true);
  });
});