import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  Fragment,
  useEffect,
} from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MemoizedInputComponent from "../inputComponent";
import { DNA } from "react-loader-spinner";


const ApplicantProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState([]);
  console.log(profileDetails);

  useEffect(() => {
    const fetchPRofileDetails = async () => {
      const token = Cookies.get("token");
      axios
        .get(`${baseUrl}/get-applicationProfileDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchPRofileDetails();
  }, []);

  const navigation = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("token");
      navigation("/applicant-login");
    }
  };
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <button
        className="ProfileDetailsBtn"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <h5>Profile Details</h5>
      <Fragment>
        {profileDetails.length > 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <div className="patient-details__name-phone-container">
              <div className="patient-details-name-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="First Name :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="first_name"
                  value={profileDetails[0].first_name}
                  setProfileDetails={setProfileDetails}
                />
              </div>

              <div className="patient-details-phone-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Last Name :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="last_name"
                  value={profileDetails[0].last_name}
                  setProfileDetails={setProfileDetails}
                />
              </div>
            </div>

            <div className="patient-details__name-phone-container">
              <div className="patient-details-name-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Mobile Number :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="mobile_number"
                  value={profileDetails[0].mobile_number}
                  setProfileDetails={setProfileDetails}
                />
              </div>

              <div className="patient-details-phone-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Experience :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="years_of_experience"
                  value={profileDetails[0].years_of_experience}
                  setProfileDetails={setProfileDetails}
                />
              </div>
            </div>

            <div className="patient-details__name-phone-container">
              <div className="patient-details-name-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Date Of Birth :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="DOB"
                  value={profileDetails[0].DOB}
                  setProfileDetails={setProfileDetails}
                />
              </div>

              <div className="patient-details-phone-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Graduation :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="highest_graduation"
                  value={profileDetails[0].highest_graduation}
                  setProfileDetails={setProfileDetails}
                />
              </div>
            </div>

            <div className="patient-details__name-phone-container">
              <div className="patient-details-name-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="CGPA/Percentage :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="CGPA"
                  value={profileDetails[0].CGPA}
                  setProfileDetails={setProfileDetails}
                />
              </div>
              <div className="patient-details-phone-container">
                <MemoizedInputComponent
                  type="text"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="current_address"
                  displayName="Current Address :"
                  value={profileDetails[0].current_address}
                  setProfileDetails={setProfileDetails}
                />
              </div>
            </div>

            <div className="patient-details__name-phone-container">
              <div className="patient-details-name-container">
                <MemoizedInputComponent
                  type="text"
                  displayName="Graduation Year :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="graduation_year"
                  value={profileDetails[0].graduation_year}
                  setProfileDetails={setProfileDetails}
                />
              </div>

              <div className="patient-details-phone-container">
                <MemoizedInputComponent
                  type="file"
                  displayName="Update CV :"
                  applicant_email={profileDetails[0].applicant_email}
                  keyName="Update CV"
                />
              </div>
            </div>
          </div>
        ) : (
          <div><p
          style={{
            textAlign: "center",
            marginTop: "3.5rem",
          }}
        >
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </p></div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default ApplicantProfileDetails;
