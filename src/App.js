import React, { createContext, useState } from 'react';
import './App.css';
import { Navigation } from './Components/Navigation/navigation';
import { PrimeReactProvider } from 'primereact/api';

export const baseUrl = "http://localhost:3004"


 export const AppContext = createContext();

function App() {
  const [role__id, setRole__id] = useState("");
  const [applicant_emailID, setApplicant_emailID]=useState("");
  const [jdData ,setJdData]=useState([]);
  const [applicantRegisterDetails ,setApplicantRegisterDetails] = useState({});
  const [applicantPassword , setApplicantPassword] = useState('');

// console.log(jdData , "hellooo")
// console.log(applicantPassword , "pass")
// console.log(applicantRegisterDetails , "applicationData");
// console.log(applicant_emailID , "applicant_emailID")

  return (
    <PrimeReactProvider>
    <AppContext.Provider value={{ role__id, setRole__id,applicant_emailID,
      setApplicant_emailID,applicantRegisterDetails,
      setApplicantRegisterDetails,jdData,setJdData,applicantPassword,setApplicantPassword}}>
      <div>
        <Navigation/>
      </div>
    </AppContext.Provider>
    </PrimeReactProvider>

  );
}

export default App;
