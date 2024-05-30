import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../App';
import Cookies from 'js-cookie';

function HiringManager() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // console.log(email);
  // console.log(password);



  const handleHmLoginForm = async (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(`${baseUrl}/admin-login`, obj);
      if (response.data.message === 'Login successfully') {
        Cookies.set("TOKENS", 'dWIiOiIxMjM0NTY3ODkibmFtZSI');
 

        navigate(`/careersList/${email}`);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError('Error occurred. Please try again.');
    }
  };

  return (
    <div className='hiringManger-container'>
      <h2 className='hiringManger-container__h2'>Hiring Manager Login</h2>
      <form onSubmit={handleHmLoginForm}>
        <label htmlFor='hm-email-id' className='hm-email-id'>Email Id:</label><br />
        <input
          type='email'
          name='hm-email-id'
          id='hm-email-id'
          placeholder='Enter Your Email'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        /><br />

        <label htmlFor='hm-password' className='hm-password'>Password:</label><br />
        <input
          type='password'
          name='hm-password'
          id='hm-password'
          placeholder='Enter Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {error && <small className='hiringManger-container__small' style={{ color: 'red' }}>{error}</small>}<br />
        <input className='hiringManger-container__btn' type='submit' value='Login' id='login-btn' />
      </form>
    </div>
  );
}

export default HiringManager;
