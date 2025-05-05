const fs = require('fs');
const path = require('path');

process.env.REACT_APP_API_URL = 'http://localhost:3001';

const courseActionsTestPath = path.resolve(__dirname, 'src/__tests__/actions/courseActions.test.js');
let courseActionsTestContent = fs.readFileSync(courseActionsTestPath, 'utf8');

courseActionsTestContent = courseActionsTestContent.replace(
  /fetchMock.getOnce\('http:\/\/localhost:3001\/courses'/g,
  "fetchMock.getOnce(`${process.env.REACT_APP_API_URL}/courses`"
);

fs.writeFileSync(courseActionsTestPath, courseActionsTestContent);

const enquiryActionsTestPath = path.resolve(__dirname, 'src/__tests__/actions/enquiryActions.test.js');
let enquiryActionsTestContent = fs.readFileSync(enquiryActionsTestPath, 'utf8');

enquiryActionsTestContent = enquiryActionsTestContent.replace(
  /fetchMock.postOnce\('http:\/\/localhost:3001\/enquiries'/g,
  "fetchMock.postOnce(`${process.env.REACT_APP_API_URL}/enquiries`"
);

enquiryActionsTestContent = enquiryActionsTestContent.replace(
  /fetchMock.getOnce\('http:\/\/localhost:3001\/enquiries'/g,
  "fetchMock.getOnce(`${process.env.REACT_APP_API_URL}/enquiries`"
);

fs.writeFileSync(enquiryActionsTestPath, enquiryActionsTestContent);

console.log('Tests updated successfully to use environment variables!');