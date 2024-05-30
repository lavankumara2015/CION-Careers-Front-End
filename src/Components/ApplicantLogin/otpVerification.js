

// import React, { useState } from 'react';
// import "./index.css";

// function OtpVerification() {
//     const [page, setPage] = useState("");
//     const [showOTPInput, setShowOTPInput] = useState(false);
//     const [enteredOTP, setEnteredOTP] = useState("");
//     const [validOTP, setValidOTP] = useState("");


//     function handleOTPSubmit() {
//         if (enteredOTP === OTP.toString()) {
//           navigation("/applicantSetNewPassword");
//         } else {
//           setValidOTP("Invalid OTP. Please try again.");
//         }
//       }
//       const handleResendBtn = () => {
//         navigateToOtp();
//       };
//   return (
//     <>
//       <div>otpVerification</div>
//       {page === "otp" && showOTPInput && (
//         <div className="otpPopup">
//         <h6 className="otpPopup__h6">Enter OTP</h6>
//           <InputOtp
//             value={enteredOTP}
//             onChange={(e) => setEnteredOTP(e.value)}
//             integerOnly
//             mask
//           />
//           {validOTP && (

//             <h6
//               className="forgotPassword-container__validOTP"
//               style={{ color: "red" }}
//             >
//               {validOTP}
//             </h6>
//           )}
//           <button
//             className="forgotPassword-container__submitOTP"
//             onClick={handleOTPSubmit}
//           >
//             Submit OTP
//           </button>
//           <button
//             className="forgotPassword-container__resendOTP"
//             onClick={handleResendBtn}
//           >
//             Resend OTP
//           </button>
//         </div>
//       )}
//     </>
  
//   )
// }

// export default OtpVerification