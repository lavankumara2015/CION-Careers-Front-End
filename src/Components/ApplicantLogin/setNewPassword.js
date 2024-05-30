import React, { useContext, useEffect, useState } from 'react'
import { AppContext, baseUrl } from '../../App';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const ApplicantNewPassword = () => {
    const {setApplicantPassword,applicant_emailID} = useContext(AppContext)

const navigation = useNavigate();
const [NewPassword ,setNewPassword ] = useState("");
const [ConfirmPassword ,setConfirmPassword ] = useState("");
const [error ,setError] = useState("");
var firstLogin = Cookies.get('value');



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



   const handleConfirmBtn = (e) => {
    e.preventDefault();
    if(firstLogin === "firstLogin"){
        if (NewPassword === ConfirmPassword) {
            setApplicantPassword(ConfirmPassword);
            const token = Cookies.get("token");
            axios.put(`${baseUrl}/applicantSetNewPassword`, {
                ConfirmPassword,
                applicant_emailID

            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                alert("Password Changed Successfully");
                setConfirmPassword("");
                setNewPassword("");
                navigation('/applicant-login')
    
            })
            .catch(error => {
                setError("Failed to change password. Please try again.");
            });
        } else {
            setError("Password not matched");
        }
    }else{
        if (NewPassword === ConfirmPassword) {
            setApplicantPassword(ConfirmPassword);
            const token = Cookies.get("token");
                alert("Register Successfully");
                setConfirmPassword("");
                setNewPassword("");
                navigation('/reasonForApplying')
            
        } else {
            setError("Password not matched");
        }
    }
}
  return (
    <section>
    <div className='resetPassword-container'>
    <h6 className='resetPassword-container__h6'> { firstLogin === 'firstLogin' ? "Reset Password" : "Set Your Password"}</h6>
    <form onSubmit={handleConfirmBtn}>
    <label htmlFor="NewPassword" className="NewPassword">{ firstLogin === 'firstLogin' ? "New Password:" : "Set Password:"}</label><br />
                <input type="password" name="NewPassword" id="forgotPassword" placeholder="Enter New Password"
                    required
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                /><br/>
                <label htmlFor="ConfirmPassword" className="ConfirmPassword">Confirm Password:</label><br />
                <input type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder="Enter Confirm Password"
                    required
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br/>
                { error && <small className='resetPassword-container__small' style={{color:"red"}}>{error}</small>}<br/>
                <button className='resetPassword-container__submit' type="submit">Submit</button>
 </form>

    </div>
    </section>
  )
}
