import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./index.css";
import { AppContext, baseUrl } from "../../App";
import HTMLContent from "../HtmlCode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Footer } from "../Footer";
import { DNA } from "react-loader-spinner";

const roleOptionsByDepartment = {
  "Digital Team": [
    "Digital Cancer Coach",
    "Digital Marketing",
    "Graphic Designer",
    "Content Writer",
    "Content Writing Intern",
    "Full Stack Developer",
    "Full Stack Developer Intern"
  ],
  "Human Resources": ["HR Recruiter", "HR Executive"],
  "Accounts/Financial": ["Accounts Executive", "Accounts Manager"],
  Operations: [
    "Area Manager",
    "Operations Executive",
    "Network/Operation Manager",
    "Quality Executive",
    "Business analyst",
    "Cluster Manager",
  ],
  Pharmacy: ["Clinical Pharmacist", "HOD Pharmacist"],
  Nursing: ["Staff Nurse", "HOD Nurse"],
  Facilities: ["Facility Support", "House Keeping"],
  Doctor: [
    "Anesthesiologist",
    "Surgical Oncologist",
    "Medical Oncologist",
    "Radiation Oncologist",
  ],
  Nutritionist: ["clinical nutritionist"],
  Psychologist: ["Clinical Psychologist"],
  "Genetic counsellor": ["Genetic Counselor"],
  Screening: ["Screening Coach", "Screening Manager"],
  Marketing: ["Marketing Executive", "Marketing Manager"],
  "Cancer Coach": ["Lead Cancer Coach", "Cancer Coach"],
};

function Careers() {
  const navigation = useNavigate();
  const { setRole__id } = useContext(AppContext);
  const [careersData, setCareersData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [filterItems, setFilterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);


  useEffect(() => {
    axios
      .get(`${baseUrl}/show-roleDetails`)
      .then((response) => {
        const data = response.data;
        setCareersData(data);
        setFilterItems(data);
        setLoading(false);
        const uniqueLocations = [...new Set(data.map(job => job.location))];
        setLocations(uniqueLocations);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleRoleClick = (id) => {
    Cookies.set("role_id", id);
    Cookies.set("value", "secondLogin", { expires: 30 });
    navigation("/job-description");
    setRole__id(id);
  };

  const handleLoginClick = () => {
    Cookies.set("value", "firstLogin", { expires: 30 });
    navigation("/applicant-login");
  };

  const onSelectFilter = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "Department") {
      setAvailableRoles(roleOptionsByDepartment[value] || []);
      setFilterOptions((prevState) => ({
        ...prevState,
        role: "",
      }));
    }
  };

  const handleSubmitSelect = (e) => {
    e.preventDefault();
    const filteredData = careersData.filter((eachData) => {
      return Object.entries(filterOptions).every(([key, value]) => {
        if (!value) return true; 
        if (key === "Department" || key === "role" || key === "location") {
          return eachData[key.toLowerCase()] === value;
        }
        return true;
      });
    });
    setFilterItems(filteredData);
  };

  const handleDialogOpen = (dialogId) => {
    setShowDialog(dialogId);
    setOverlayVisible(true);

  };

  const handleDialogClose = () => {
    setShowDialog(null);
    setOverlayVisible(false);

  };

  const handleOverlayClick = ()=>{
    handleDialogClose()
  }



  return (
    <div>
      <button className="career-Login" onClick={handleLoginClick}>
        Login
      </button>
      <h1 className="career-title">Careers At CION</h1>
      <div className="careers__card-container ">
        <div
          className="careers__cards"
          onClick={() => handleDialogOpen("myDialog1")}>
          <img src="assets/benefits.webp" alt="" className="careers__images" />
          <h6 className="careers__cards-h6">Benefits</h6>
          <p className="careers__cards-p">
            Explore CION’s world-class benefits designed to help you and your
            family live well.
          </p>
        </div>
        <div
          className="careers__cards"
          onClick={() => handleDialogOpen("myDialog2")}
        >
          <img src="assets/culture.webp" alt="" className="careers__images" />
          <h6 className="careers__cards-h6">Culture</h6>
          <p className="careers__cards-p">
            We will only achieve our mission if we live our culture, which
            starts with applying a growth mindset.
          </p>
        </div>
        <div
          className="careers__cards"
          onClick={() => handleDialogOpen("myDialog3")}
        >
          <img src="assets/diversity.webp" alt="" className="careers__images" />
          <h6 className="careers__cards-h6">Diversity and inclusion</h6>
          <p className="careers__cards-p">
            We are committed to celebrating the diversity around us and its
            power to drive us forward together.
          </p>
        </div>
        <div
          className="careers__cards"
          onClick={() => handleDialogOpen("myDialog4")}
        >
          <img
            src="assets/missionandvision.webp"
            alt=""
            className="careers__images"
          />
          <h6 className="careers__cards-h6">Mission and Vision</h6>
          <p className="careers__cards-p">
          At CION Cancer Clinics, our mission is to make world-class
          cancer treatment accessible and affordable for everyone.
          </p>
        </div>
      </div>
      <br />

      <div className={`myDialog-main-container ${overlayVisible ? "overlay-visible" : ""}`}  onClick={handleOverlayClick}>
        <dialog id="myDialog1" open={showDialog === "myDialog1"}>
          <img
          
            src="assets/Cancel.webp"
            alt="cancel-icon"
            onClick={handleDialogClose}
          />
          <h5>Work-Life Balance</h5>
          <p>
            At CION Cancer Clinics, we understand the importance of maintaining
            a healthy work-life balance. With our fixed working hours, you can
            effectively plan your personal and professional life, ensuring that
            you have time for both your career and your loved ones. We believe
            that a balanced life leads to greater job satisfaction and overall
            well-being.
          </p>
          <h5>Making a Difference</h5>
          <p>
            Be a part of something bigger. Our mission is to make cancer care
            accessible and affordable for everyone. When you join our team,
            you’re not just taking a job—you’re joining a cause. Your work will
            directly impact the lives of cancer patients and their families,
            providing them with the care they need. The sense of fulfilment and
            purpose that comes from helping others is unparalleled.
          </p>
          <h5>Provident Fund (PF)</h5>
          <p>
            We care about your future. Our provident fund program ensures that
            you have a secure financial foundation. With contributions from both
            you and the company, our PF plan helps you save for the long term,
            providing peace of mind and financial security. It’s our way of
            investing in your future as you invest in ours.
          </p>
          <h5>Additional Benefits</h5>
          <p>
            Competitive salary packages <br />
            Professional development opportunities
            <br />A supportive and inclusive work environment
          </p>
          <p className="myDialog-main-container__p">
            Join CION Cancer Clinics and be a part of a team that values your
            well-being, supports your professional growth, and gives you the
            opportunity to make a real difference in the world.
          </p>
          <br />
        </dialog>
        <dialog id="myDialog2" open={showDialog === "myDialog2"}>
          <img
            src="assets/Cancel.webp"
            alt="cancel-icon"
            onClick={handleDialogClose}
          />

          <h5>Collaborative Environment</h5>
          <p>
            At CION Cancer Clinics, teamwork is at the heart of everything we
            do. We foster an environment where open communication, idea sharing,
            and mutual respect are paramount, allowing innovation to thrive.
          </p>
          <h5>Commitment to Excellence</h5>
          <p>
            We are dedicated to providing the highest quality of care to our
            patients. Our commitment to excellence drives us to continually
            exceed expectations and deliver outstanding results.
          </p>
          <h5>Inclusivity and Diversity</h5>
          <p>
            We celebrate diversity and embrace inclusivity. At CION, everyone is
            valued and respected, and diverse perspectives are seen as a source
            of strength and innovation.
          </p>
          <h5>Continuous Learning</h5>
          <p>
            We are passionate about professional growth. With numerous
            opportunities for learning and development, we support our team
            members in enhancing their skills and advancing their careers.
          </p>
          <h5>Caring Community</h5>
          <p>
            We are more than colleagues—we are a community. We support each
            other through challenges and celebrate successes together, fostering
            a strong sense of camaraderie and belonging.
          </p>
          <p className="myDialog-main-container__p">
            Join us at CION Cancer Clinics and be part of a culture where you
            can thrive, be yourself, and make a meaningful impact every day.
          </p>
          <br />
        </dialog>
        <dialog id="myDialog3" open={showDialog === "myDialog3"}>
          <img
            src="assets/Cancel.webp"
            alt="cancel-icon"
            onClick={handleDialogClose}
          />
          <h5>Diversity and Inclusion</h5>
          <p>
            We are committed to celebrating the diversity around us and its
            power to drive us forward together.
          </p>
        </dialog>
        <dialog id="myDialog4" open={showDialog === "myDialog4"}>
          <img
            src="assets/Cancel.webp"
            alt="cancel-icon"
            onClick={handleDialogClose}
          />
          <h5>Mission and Vision</h5>
          <p>
          At CION Cancer Clinics, our mission is to make world-class cancer treatment accessible and affordable for everyone.
          </p>
        </dialog>
      </div>
      <br />
      <div className="careers__banner-container">
        <img
          className="careers__banner-img"
          src="assets/BannerImage.webp"
          alt="banner"
        />
        <h2 className="Open-Positions">Open Positions</h2>
        <form className="careers__form-container" onSubmit={handleSubmitSelect}>
          <select
            className="careers__dropDown-select"
            name="Department"
            onChange={onSelectFilter}
          >
            <option value="">Select Department</option>
            {Object.keys(roleOptionsByDepartment).map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
           <select
            className="careers__dropDown-select"
            name="location"
            onChange={onSelectFilter}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className="careers__dropDown-select"
            name="role"
            onChange={onSelectFilter}
          >
            <option value="">Select Role</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          
          <input
            type="submit"
            className="careers__FindJob-btn"
            value="Find Job"
          />
        </form>
      </div>
      <br />
      {loading ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            position: "relative",
            bottom: "2rem",
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
        </p>
      ) : filterItems.length > 0 ? (
        <div className="cards-main-container">
          {filterItems.map((career) => (
            <div
              onClick={() => handleRoleClick(career.role_id)}
              className="card"
              key={career.role_id}
            >
              <img
                className="card__image"
                src={`../assets/role-icon/${career.role_icon_url}`}
                alt="image"
              />
              <h3 className="card__text-h3">{career.role}</h3>
              <p className="card__location">@{career.location}</p>
              <p className="card__role-overview">
                <HTMLContent
                  content={career.job_description.substring(0, 132)}
                />
                <b className="card__read-more">Read more</b>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            position: "relative",
            bottom: "2rem",
          }}
        >
          No jobs Found
        </p>
      )}
      <div className="WeAreHiring-container">
        {/* <p className="WeAreHiring-container__p">We Are Hiring</p> */}
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
