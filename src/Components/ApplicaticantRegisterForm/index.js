import './index.css';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../App';
import { ApplicantForgotPassword } from '../ApplicantLogin/forgotPassword';


export const ApplicantForm = () => {

  
  const {setApplicantRegisterDetails ,jdData} = useContext(AppContext)
  const [next , setNext]=useState(false);


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = 'Are you sure you want to reload this page?';
      event.returnValue = confirmationMessage; 
      return confirmationMessage; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


    const applicantForm = useRef({
        firstname: "",
        lastname:"",
        highest_graduation: "",
        graduation_year:"",
        cgpa:"",
        current_address:"",
        mobile_number:"",
        dob: "",
        experience:"",
        cv_uploaded:"",
    });

    const handleInputs = (e) => {
      const { name, value, type, files } = e.target;
      if (type === "file") {
        applicantForm.current[name] = files[0];
      } else {
        applicantForm.current[name] = value;
      }
    };
  

    const handleSubmit = (e) => {
        e.preventDefault();
        setNext(true);
        setApplicantRegisterDetails({
            ...applicantForm.current,
            role: jdData[0].role,
            role_id: jdData[0].role_id,
            department: jdData[0].department
        })
    }
  return (
<div className="Register-Section">
  {
    !next ? 
    <div className="application-form">
  <h2 className="application-form__h2">Applicant Register Page</h2>
  <form
    action=""
    method="post"
    encType="multipart/form-data"
    onSubmit={handleSubmit}
    
  >
    <label htmlFor="name" className="name">
     First Name<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label><br/>
    <input
      type="text"
      id="name"
      name="firstname"
      placeholder="Enter First Name"
      minLength={3}
      required
      onChange={handleInputs}
    />
  
    <label htmlFor="dob" className="lastname">
      Last Name<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label><br/>
    <input
      type="Text"
      id="lastname"
      name="lastname"
      placeholder="Enter Last Name"
      required
      onChange={handleInputs}
    />
    <label htmlFor="highest_graduation" className="highest_graduation">
      Highest Graduation
      <p style={{ color: "red", display: "inline-block" }}>*</p>
    </label>
    <input
      type="text"
      id="highest_graduation"
      placeholder="Enter Highest Graduation"
      name="highest_graduation"
      required
      onChange={handleInputs}
    />
    <br />
    <label htmlFor="graduation_year" className="graduation_year">
      Graduation Year<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label>
    <input
      type="number"
      id="graduation_year"
      placeholder="Enter Graduation-Year"
      maxLength={4}
      name="graduation_year"
      required
      onChange={handleInputs}

    />
 
    <label htmlFor="cgpa" className="cgpa">
      CGPA/Percentage<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label><br/>
    <input
      type="number"
      id="cgpa"
      name="cgpa"
      placeholder="Enter CGPA/Percentage"
      step="any"
      maxLength={3}
      required
      onChange={handleInputs}

    />{" "}
    <label htmlFor="current_address" className="current_address">
      Current Address<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label>
    <input
      type="text"
      id="current_address"
      placeholder="Enter Current-Address"
      name="current_address"
      required
      onChange={handleInputs}
    />
    <br />
    <label htmlFor="mobile_number" className="mobile_number ">
      Mobile Number<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label><br/>
    <input
      type="tel"
      id="mobile_number"
      name="mobile_number"
      placeholder="Enter Mobile-Number"
      minLength={10}
      maxLength={10}
      required
      onChange={handleInputs}

    />

<label htmlFor="mobile_number" className="mobile_number email">
      DOB<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label><br/>
    <input
      type="date"
      id="dob"
      name="dob"
      required
      onChange={handleInputs}

    />


    <label htmlFor="experience" className="mobile_number experience">
      Experience<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label>
    <input
      type="tel"
      id="experience"
      name="experience"
      placeholder="Enter Experience"
      maxLength={2}
      required
      onChange={handleInputs}
      style={{ marginLeft: "0.83rem" }}
    />
    <br />
    <br /><br/><br/><br/>
    <label htmlFor="cv_uploaded" className="cv_uploaded">
      Upload CV<p style={{ color: "red", display: "inline-block" }}>*</p>
    </label>
    <input
      type="file"
      id="cv_uploaded"
      name="cv_uploaded"
      accept=".pdf, .doc, .docx"
      required
      onChange={handleInputs}
    />
    <br />
      <input type="submit"className="form-btn" value="Next" />
  </form>
</div>
 : <ApplicantForgotPassword setPassword="setPassword"/>
  }
</div>
  )
}

