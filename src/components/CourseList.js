import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, setSelectedCourse, clearSelectedCourse } from '../actions/courseActions';
import EnquiryForm from './EnquiryForm';
import './CourseList.css';

function CourseList() {
  const dispatch = useDispatch();
  const { courses, loading, error, selectedCourse } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEnquireClick = (course) => {
    dispatch(setSelectedCourse(course));
  };

  const handleFormClose = () => {
    dispatch(clearSelectedCourse());
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list-container">
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="course-details">
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> ${course.price}</p>
            </div>
            <button 
              className="enquire-button" 
              onClick={() => handleEnquireClick(course)}
            >
              Enquire Now
            </button>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <EnquiryForm 
          course={selectedCourse} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  );
}

export default CourseList;