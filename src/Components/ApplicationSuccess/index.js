import React from "react";
import "./index.css";
import { Link } from "react-router-dom";


export const ApplicationSuccessPage = () => {
  return (
    <>
<div className="applicationDone-container">
  <img src="assets/successfull1.gif" alt="successful-icon"/>
  <h1>Your Application Received</h1>
  <p>Thank you for applying to our company. We will get back to you soon.</p>
   <Link to={'/applicant-dashboard'}>Go To DashBoard</Link>
</div>
    </>
  )
}
