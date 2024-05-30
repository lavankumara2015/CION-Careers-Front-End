import React, { useContext, useState } from 'react';
import "./index.css";
import { AppContext, baseUrl } from '../../App';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ReasonForApplying = () => {
  const { jdData, applicantPassword, applicantRegisterDetails, applicant_emailID } = useContext(AppContext);
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const [reason, setReason] = useState('');
  const [err, setErr] = useState('');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const firstLogin = Cookies.get('value');
    const formData = new FormData();
    formData.append('email', applicant_emailID);
    console.log(formData)
    formData.append('Password', applicantPassword);
    formData.append('reasonForApplying', reason);
    if (cvFile) {
      formData.append('cv_uploaded', cvFile);
    }
    formData.append('applicantRegisterDetails', JSON.stringify(applicantRegisterDetails));


    if (firstLogin !== 'firstLogin') {
      try {
        const { role, role_id, department } = jdData[0] || {};
        if (!role || !role_id || !department) {
          setErr("Job details are missing. Please check your input.");
          return;
        }

        const additionalDetailsResponse = await fetch(`${baseUrl}/get-additional-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: applicant_emailID }),
        });

        const additionalDetails = await additionalDetailsResponse.json();
        if (!additionalDetails) {
          setErr("Failed to fetch additional details");
          return;
        }

        if (firstLogin === 'ThirdLogin') {
          const formData = new FormData();
          formData.append('email', applicant_emailID);
          formData.append('Password', applicantPassword);
          formData.append('reasonForApplying', reason);
          if (cvFile) {
            formData.append('cv_uploaded', cvFile);
          }
          const applicantDetails = {
            role,
            role_id,
            department,
            firstname: additionalDetails.first_name,
            lastname: additionalDetails.last_name,
            mobile_number: additionalDetails.mobile_number,
            experience: additionalDetails.years_of_experience,
            dob: additionalDetails.DOB,
            cgpa: additionalDetails.CGPA,
            highest_graduation: additionalDetails.highest_graduation,
            graduation_year: additionalDetails.graduation_year,
            current_address: additionalDetails.current_address,
          };
          formData.append('applicantRegisterDetails', JSON.stringify(applicantDetails));
          const response = await fetch(`${baseUrl}/Submit-details`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: formData,
          });
          const data = await response.json();
          if (data.token) {
            Cookies.set('token', data.token, { expires: 30 });
            navigate('/applicationSuccessPage');
          } else {
            setErr(data.message || "Failed to submit details");
          }
        }else{
          const response = await fetch(`${baseUrl}/Submit-details`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body: formData,
          });    
          const data = await response.json();
          if (data.token) {
            Cookies.set('token', data.token, { expires: 30 });
            navigate('/applicationSuccessPage');
          } else {
            setErr(data.message || "Failed to submit details");
            return;
          }
        }
      } catch (error) {
        console.error(error);
        setErr(error.message || "An error occurred");
      }
    }
  };

  return (
    <section>
      <div className='reasonForApplying-container'>
        <h5>Fill The Form</h5>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor='reasonForApplying' className='reasonForApplying'>
            Reason For Applying <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <textarea
            id='reasonForApplying'
            name='reasonForApplying'
            placeholder='Enter Reason For Applying'
            value={reason}
            required
            onChange={(e) => setReason(e.target.value)}
          />
          <br />
          <label htmlFor='resumeUpload' className='resumeUpload'>
            Updated CV <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input
            type="file"
            id="resumeUpload"
            name="resumeUpload"
            accept=".pdf, .doc, .docx"
            required
            onChange={(e) => setCvFile(e.target.files[0])}
          />
          <br />
          <p style={{ color: "red", fontSize: "0.4rem" }}>{err}</p>
          <input type='submit' className='reasonForApplying-btn' value="Submit" />
        </form>
      </div>
    </section>
  );
};
