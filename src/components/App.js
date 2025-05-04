import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import CourseList from './CourseList';
import EnquiryList from './EnquiryList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Courses</Link>
              </li>
              <li>
                <Link to="/enquiries">Enquiries</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/enquiries" element={<EnquiryList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
