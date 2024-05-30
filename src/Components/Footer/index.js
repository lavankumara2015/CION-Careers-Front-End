

import React from 'react';
import "./index.css"

export const Footer = () => {
  return (
    <>
  <footer style={{ marginLeft: "2rem" }}>
    <div className="footer-main-container">
      <div className="footer-our-vision-container">
        <div className="footer-our-vision">
          <h4>OUR VISION</h4>
          <span />
          <small className="footer-main-heading-underline" />
          <p>
            To reduce cancer related mortality in India by empowering
            individuals to take control of their health and by helping them make
            informed decisions for a healthier life.
          </p>
          <h2>
            <a href="tel:18001202676">
              <i className="fas fa-phone" style={{ color: "#5d0f7d" }}>
                {" "}
                &nbsp;{" "}
                <b
                  style={{
                    fontFamily:
                      '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}
                >
                  1800 120 2676
                </b>{" "}
              </i>
            </a>
          </h2>
        </div>
      </div>
      <div className="our-services-main-container">
        <div className="our-services-container">
          <h4>OUR SERVICES</h4>
          <span />
          <small className="footer-main-heading-underline" />
          <ul>
            <li>
              <a href="https://www.cioncancerclinics.com/medical-oncology">
                MEDICAL ONCOLOGY
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/surgical-oncology">
                SURGICAL ONCOLOGY
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/radiation-oncology">
                RADIATION ONCOLOGY
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/integrative-care">
                INTEGRATIVE CARE
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/screening">
                SCREENING
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="quick-links-main-container">
        <div className="quick-links-container">
          <h4>QUICK LINKS</h4>
          <span />
          <small className="footer-main-heading-underline" />
          <ul>
            <li>
              <a href="https://www.cioncancerclinics.com/blog/categories/miscellaneous">
                BLOG
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/media">MEDIA</a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/bio-medical-waste-data">
                BIO-MEDICAL WASTE MANAGEMENT
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/grievance-redressal-policy">
                GRIEVANCE REDRESSAL POLICY
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/terms-conditions">
                TERMS &amp; CONDITIONS
              </a>
            </li>
            <li>
              <a href="https://www.cioncancerclinics.com/privacy-policy">
                PRIVACY POLICY
              </a>
            </li>
          </ul>
        </div>
        <div className="Social-media-main-container">
          <br />
          <h4>FOLLOW US</h4>
          <span />
          <small className="footer-main-heading-underline" />
          <div className="social-media-container">
            <a
              href="https://www.facebook.com/CIONCancerClinics/"
              target="_blank"
            >
              <img
                src="https://www.cioncancerclinics.com/assets/newimg/facebook.png"
                className="footer-icon-new"
                alt="footer-icon"
              />
            </a>
            <a
              href="https://www.instagram.com/cioncancerclinics/"
              target="_blank"
            >
              <img
                src="https://www.cioncancerclinics.com/assets/newimg/instagram.png"
                className="footer-icon-new"
                alt="footer-icon"
              />
            </a>
            <a href="https://www.cioncancerclinics.com/blog/categories/miscellaneous">
              <img
                src="https://www.cioncancerclinics.com/assets/newimg/blog.png"
                className="footer-icon-new"
                alt="footer-icon"
              />
            </a>
            <a
              href="https://www.youtube.com/@CIONCancerClinics"
              target="_blank"
            >
              <img
                src="https://www.cioncancerclinics.com/assets/newimg/youtube.png"
                className="footer-icon-new"
                alt="footer-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>{" "}
  <br />
  <div className="footer">
    <h1>
      {" "}
      <span>®</span>CIPHER ONCOLOGY
    </h1>
  </div>
</>

  )
}
