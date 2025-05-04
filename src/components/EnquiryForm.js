import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitEnquiry } from '../actions/enquiryActions';
import './EnquiryForm.css';

function EnquiryForm({ course, onClose }) {
  const dispatch = useDispatch();
  const { submitting, submitSuccess, error: submitError } = useSelector(state => state.enquiries);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    courseId: course.id,
    courseTitle: course.title
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [submitSuccess, onClose]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(submitEnquiry(formData));
    }
  };

  return (
    <div className="enquiry-form-overlay">
      <div className="enquiry-form-container">
        <div className="enquiry-form-header">
          <h2>Enquire about: {course.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {submitSuccess ? (
          <div className="success-message">
            <h3>Thank you for your enquiry!</h3>
            <p>We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>
            
            {submitError && <div className="error-message submit-error">Failed to submit enquiry. Please try again.</div>}
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EnquiryForm;