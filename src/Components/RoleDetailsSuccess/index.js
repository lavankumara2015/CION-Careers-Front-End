

import React from 'react';
import "./index.css"

function ApplicationDone() {
  return (
    <div className="applicationDone-container">
      <img src="assets/successfull1.gif"  alt="done-icon" />
      <h1>The Role Requirement details have been successfully submitted.</h1>
      <p>To View Updates, Click Go To Home Button</p>
      <a href="./">Go To Home</a>
    </div>
  );
}

export default ApplicationDone;
