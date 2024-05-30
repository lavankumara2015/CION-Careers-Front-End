import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { baseUrl } from "../App";

const InputComponent = (params) => {
  const {
    applicant_email,
    displayName,
    keyName,
    type,
    value,
    setProfileDetails,
  } = params;
  console.log(applicant_email, "email");

  const inputChange = (e) => {
    setProfileDetails((prevData) =>
      prevData.map((item) =>
        item.applicant_email === applicant_email
          ? { ...item, [keyName]: e.target.value }
          : item
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      UpdateProfileDetails();
    }
  };

  const UpdateProfileDetails = async () => {
    const token = Cookies.get("token");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        applicant_email: applicant_email,
        field: keyName,
        newValue: value,
      }),
    };

    try {
      const response = await fetch(
        `${baseUrl}/update-profileDetails`,
        options
      );
      if (response.ok) {
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    } catch (err) {
      toast.error("Failed");
      console.log(err.message);
    }
  };

  const onUpdateCV = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('email', applicant_email);

    try {
      const token = Cookies.get("token");
      const response = await fetch(`${baseUrl}/update-cv`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Update Unsuccessful: ${errorData.message}`);
      }
    } catch (err) {
      toast.error("Update Unsuccessful");
      console.error("Error:", err);
    }
  };

  const getInputValue = () => {
    switch (type) {
      case "file":
        return (
          <input type="file" onChange={onUpdateCV} accept=".pdf, .doc, .docx" />
        );
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={inputChange}
            onKeyDown={handleKeyDown}
            onBlur={UpdateProfileDetails}
            disabled={
              keyName === "first_name" ||
              keyName === "last_name" ||
              keyName === "DOB"
            }
          />
        );
    }
  };

  return (
    <Fragment>
      <label>{displayName}</label>
      {getInputValue()}
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
    </Fragment>
  );
};

const MemoizedInputComponent = React.memo(InputComponent);

export default MemoizedInputComponent;
