import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext, baseUrl } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

export const ApplicantLogin = () => {
  const {setApplicant_emailID,setApplicantPassword} = useContext(AppContext);
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("");

  // useEffect(() => {
  //   let token = Cookies.get('token')
  //   let firstLogin = Cookies.get('value')
  //   if(firstLogin === 'firstLogin'){
  //     if (token){
  //       navigation('/applicant-dashboard', {
  //         replace: true
  //       })
  //   }else{
  //     navigation('/applicant-login')
  //   }
  //   }
  // }, [])



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/applicant-login`, {
        email_id: email,
        password: password
      });

      if (response.status === 200) {
        Cookies.set( 'token', response.data.token, {expires : 30});
      const firstLogin =  Cookies.get('value');
      if(firstLogin !== 'firstLogin'){
       navigation('/reasonForApplying');
       setApplicant_emailID(email);
       setApplicantPassword(password);
       Cookies.set("value" ,"ThirdLogin");
      }else{
        navigation(`/applicant-dashboard`)
        setApplicant_emailID(email);
      }
     
      } else {
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error?.response?.data?.msg || "")
    }
  }
  const handleRegisterBtn =()=>{
    const firstLogin =  Cookies.get('value');

      if(firstLogin === 'firstLogin'){
       navigation('/');
      }else{
        navigation(`/applicant-registerForm`);
      }
  }

  const handleForgotPassword = ()=>{
    let firstLogin = Cookies.get('value');
     firstLogin = "firstLogin"
         Cookies.set('value' , firstLogin) 
         navigation('/applicant-forgotPassword')
    
  }

  return (
    <section>
    <div className='applicant-container' >
      <h2 className='applicant-container__h2' >Applicant Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="applicant-email-id" className="applicant-email-id"> Email Id:</label><br/>
        <input type="email" name="applicant-email-id" id="applicant-email-id" placeholder="Enter Your Email" required onChange={(e) => setEmail(e.target.value)} value={email} /> <br/>
  
        <label htmlFor="applicant-password" className="applicant-password">Password:</label><br/>
        <input type="password" name="applicant-password" id="applicant-password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        {
          error && <small className='applicant-container__small' style={{color:"red"}}>{error}</small>
        }<br/>
        <div className='applicant-container__Link' onClick={handleForgotPassword}>Forgot Password</div><br/>
        <input className='applicant-container__submit' type="submit" value="Login" id="login-btn"/>
        <h5 className='applicant-container__h5'>Don't Have An Account? <span onClick={handleRegisterBtn} className='applicant-container__Link2'>Register Here</span></h5>
      </form>
    </div>
    </section>
  );
}
