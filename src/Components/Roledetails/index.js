import React, { useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const RoleForm = () => {
  
  const [roleLogo, setRoleLogo] = useState(null);
  const navigator = useNavigate();
  const role_details=useRef({
    department:"",
    role:"",
    location:"",
    experiences:"",
    Eligibility:"",
    hiring_manager:"",
    hiring_manager_email:"",
    role_logo_url:"",
    job_description:"",
    skill_required:""
  })


const handleInput = (e) => {
  role_details.current[e.target.name] = e.target.value;
};

const handleJobDescriptionChange = (event, editor) => {
    const data = editor.getData();
    role_details.current.job_description = data;

}

  const handleSkillRequiredChange = (event, editor) => {
    const data = editor.getData();
    role_details.current.skill_required = data;
  };



const handleSubmit = async(e)=>{
   e.preventDefault();
try{
    const response = await axios.post(`${baseUrl}/add-roleDetails`, role_details.current);
    if(response.status===200){
        navigator('/application-created');
    }
}catch (error) {
    console.error('Error:', error);
}
}

const handleLogoClick=(logo) => {
    setRoleLogo(logo.img);
    role_details.current.role_logo_url=logo.value;
    let dialog = document.getElementById("myDialog");
    dialog.close();
  };


  return (
    <>
      <h1 className="role-text-h1">Fill Role Requirements</h1>
      <div className="role-details-container">
        <form action="" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
          
          <div className="department-container">
          <label htmlFor="department" className="department">
            Department:<span style={{ color: "red" }}>*</span>
          </label>
          <br/>
          {/* <input
            type="text"
            id="department"
            name="department"
            placeholder="Enter Department"
            required
            onChange={handleInput}
          /> */}
          <select id="department" name="department" required  onChange={handleInput}>
          <option value="" className="Select-Department">Select Department</option>
            <option value="Digital team">Digital Team</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Accounts/Financial">Accounts/Financial</option>
            <option value="Operations">Operations</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Nursing">Nursing</option>
            <option value="Facilities">Facilities</option>
            <option value="Doctor">Doctor</option>
            <option value="Nutritionist">Nutritionist</option>
            <option value="Psychologist">Psychologist</option>
            <option value="Genetic counsellor">Genetic counsellor</option>
            <option value="Screening">Screening</option>
            <option value="Marketing ">Marketing </option>
          </select>

          <label htmlFor="role" className="role">
            Role:<span style={{ color: "red" }}>*</span>
          </label>
          <br/>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Enter Role"
            onChange={handleInput}
            required
          />
        
  
          <label htmlFor="location" className="location">
            Location:<span style={{ color: "red" }}>*</span>
          </label>
          <br/>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter Location"
            required
            onChange={handleInput}
          /> 
          </div>
          <div className="experiences-container">
          <label htmlFor="experiences">
            Experience:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="experiences"
            name="experiences"
            placeholder=" Enter Experience"
            required
            onChange={handleInput}
          />
          <label htmlFor="Eligibility" className="Eligibility">
          Eligibility:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="Eligibility"
            name="Eligibility"
            placeholder="Enter Eligibility"
            required
            onChange={handleInput}
          />
    
          <label htmlFor="hiring_manager" className="hiring_manager">
            Hiring&nbsp;Manager
            <br />
            <span className="hm-class">Name:</span>{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="hiring_manager"
            name="hiring_manager"
            placeholder="Enter Hiring-Manager"
            required
            onChange={handleInput}
          /></div> <br/>
          <label
            htmlFor="hiring_manager_email"
            className="hiring_manager_email"
          >
            Hiring Manager
            <br />
            <span className="hme-class">Email:</span>{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="hiring_manager_email"
            name="hiring_manager_email"
            placeholder="Enter Hiring-Manager-Email"
            required
            onChange={handleInput}
          />
      
          <label htmlFor="role_logo" className="role-logo">
            Role Logo:<span style={{ color: "red" }}>*</span>
          </label>
          <img
            className="role-image-logo"
            src="./assets/down-arrow-icon.png"
            alt="administrator-logo"
            onClick={helper}
          />
          <dialog id="myDialog">
            <div style={{ display: "inline" }}
              className="myDialog-container"
              id="image-container"> {obj.map((item, index) => (
            <img key={index} src={item.img} alt={item.value} onClick={()=> handleLogoClick(item)}/>))}</div>
          </dialog>


          <div id="role-logo-div-container">
            {roleLogo && (
              <img
                style={{ width: "0.8rem", height: "0.8rem", marginLeft: "0.3rem" }}
                src={roleLogo}
                alt="selected-logo"
              />
            )}
          </div><br/><br/><br/><br/><br/><br/>
          <label htmlFor="job_description" className="job_description">
        Job Description:<span style={{ color: "red" }}>*</span>
      </label>
      <br/>
      <CKEditor
          editor={ClassicEditor}
          onChange={handleJobDescriptionChange}
        />
          <br />
          <label htmlFor="skill_required" className="skill_required">
            Skills Required:<span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <CKEditor
          editor={ClassicEditor}
          onChange={handleSkillRequiredChange}
        />
          <br />
          <center className="center-tag">
            <input
              style={{ position: "relative", bottom: "5rem" }}
              type="submit"
              defaultValue="Submit"
              id="submit-btn"
            />
          </center>
        </form>
      </div>
    </>
  );
};

export default RoleForm;
const obj = [
    {
      img: "./assets/role-icon/coach-logo.webp",
      value: "coach-logo.webp",
    },
    {
      img: "./assets/role-icon/developer-logo.webp",
      value: "developer-logo.webp",
    },
    {
      img: "./assets/role-icon/digitalmarketing-logo.webp",
      value: "digitalmarketing-logo.webp",
    },
    {
      img: "./assets/role-icon/doctor-logo.webp",
      value: "doctor-logo.webp",
    },
    {
      img: "./assets/role-icon/facilitiesboy-logo.webp",
      value: "facilitiesboy-logo.webp",
    },
    {
      img: "./assets/role-icon/hr-logo.webp",
      value: "hr-logo.webp",
    },
    {
      img: "./assets/role-icon/Intern-logo.webp",
      value: "Intern-logo.webp",
    },
    {
      img: "./assets/role-icon/manager-logo.webp",
      value: "manager-logo.webp",
    },
    {
      img: "./assets/role-icon/nurse-logo.webp",
      value: "nurse-logo.webp",
    },
    {
      img: "./assets/role-icon/nutritionist-logo.webp",
      value: "nutritionist-logo.webp",
    },
    {
      img: "./assets/role-icon/psychologist-logo.webp",
      value: "psychologist-logo.webp",
    },
    {
      img: "./assets/role-icon/sales-logo.webp",
      value: "sales-logo.webp",
    },
  ];
  const helper = () => {
    const dialog = document.getElementById("myDialog");
    dialog.showModal();
    window.onclick = function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    };
  };
  