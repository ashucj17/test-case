import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnquiries } from '../actions/enquiryActions';
import { setSelectedCourse, clearSelectedCourse } from '../actions/courseActions';
import EnquiryForm from './EnquiryForm';
import './EnquiryList.css';

function EnquiryList() {
  const dispatch = useDispatch();
  const { enquiries, loading, error } = useSelector(state => state.enquiries);
  const { selectedCourse } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchEnquiries());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleNewEnquiry = () => {
    // Create a dummy course object for general enquiries
    dispatch(setSelectedCourse({
      id: null,
      title: "General Enquiry"
    }));
  };

  const handleFormClose = () => {
    dispatch(clearSelectedCourse());
  };

  if (loading) return <div>Loading enquiries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="enquiry-list-container">
      <div className="enquiry-header">
        <h1>Course Enquiries</h1>
        <button className="new-enquiry-button" onClick={handleNewEnquiry}>
          New Enquiry
        </button>
      </div>
      
      {enquiries.length === 0 ? (
        <p>No enquiries yet. Use the "New Enquiry" button to submit one.</p>
      ) : (
        <div className="enquiry-list">
          {enquiries.map(enquiry => (
            <div key={enquiry.id} className="enquiry-card">
              <h3>Enquiry for: {enquiry.courseTitle || "General Information"}</h3>
              <div className="enquiry-details">
                <p><strong>Name:</strong> {enquiry.name}</p>
                <p><strong>Email:</strong> {enquiry.email}</p>
                <p><strong>Phone:</strong> {enquiry.phone}</p>
                {enquiry.message && (
                  <p><strong>Message:</strong> {enquiry.message}</p>
                )}
                <p className="enquiry-date">
                  <strong>Submitted:</strong> {formatDate(enquiry.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <EnquiryForm 
          course={selectedCourse} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  );
}

export default EnquiryList;
