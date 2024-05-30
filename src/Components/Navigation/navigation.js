import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '../Navbar'
import RoleForm from '../Roledetails'
import ApplicationDone from '../RoleDetailsSuccess'
import Careers from '../Careerspage'
import CareerDetails from '../Careerspage/jobDescription'
import { ApplicantLogin } from '../ApplicantLogin/loginPage'
import { ApplicantDashBoard } from '../Applicantdashboard'
import { ApplicationSuccessPage } from '../ApplicationSuccess'
import { ApplicantForgotPassword } from '../ApplicantLogin/forgotPassword'
import { ApplicantNewPassword } from '../ApplicantLogin/setNewPassword'
import { ApplicantForm } from '../ApplicaticantRegisterForm'
import { ReasonForApplying } from '../Careerspage/reasonForApplying'
import ApplicantProfileDetails from '../Applicantdashboard/applicantProfileDetails'
import OtpVerification from '../ApplicantLogin/otpVerification'
import HiringManager from '../HiringManagerLogin'
import { HiringManagerDashBoard } from '../HiringManagerLogin/adminDashBoard'
import { CareersList } from '../HiringManagerLogin/careersList'
import { RedirectToApplications } from '../HiringManagerLogin/redirectToApplications'


export const Navigation = () => {
  return (
<>
<Navbar/>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Careers/>}/>
  <Route path='/role-details' element={<RoleForm/>}/>
  <Route path='/hiring-managerLogin' element={<HiringManager/>} />
  <Route path='/hiring-Manager-DashBoard/:hr' element={<HiringManagerDashBoard/>} />
  <Route path='/careersList/:email' element={<CareersList/>} />
  <Route path='/application-created' element={<ApplicationDone/>}/>
  <Route path='/job-description' element={<CareerDetails/>} />
  <Route path='/applicant-login' element={<ApplicantLogin/>} />
  <Route path='/applicant-dashboard' element={<ApplicantDashBoard/>} />
  <Route path='/applicationSuccessPage' element={<ApplicationSuccessPage/>} />
  <Route path='/applicant-forgotPassword' element={<ApplicantForgotPassword/>} />
  <Route path='/applicantSetNewPassword' element={<ApplicantNewPassword/>} />
  <Route path='/applicant-registerForm' element={<ApplicantForm/>} />
  <Route path='/reasonForApplying' element={<ReasonForApplying/>} />
  <Route path='/applicant-profileDetails' element={<ApplicantProfileDetails/>} />
  <Route path='/otpVerification' element={<OtpVerification/>} />
  <Route path='/redirect-to-application/:id' element={<RedirectToApplications/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}


