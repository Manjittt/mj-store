import React from "react";
import Layout from "../components/layout/Layout";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="contact-wrapper">
        <div className="contact-card">
          <p className="contact-top-text">
            You can meet us here or give us a call.
          </p>

          <div className="contact-content">
            {/* LEFT */}
            <div className="contact-info">
              <h3>Contact Information</h3>
              <hr />

              <div className="info-item">
                <FaMapMarkerAlt />
                <div>
                  <strong>Shuddh Swad</strong>
                  <p>
                    Address: Patna,
                    <br />
                    Bihar, India.
                  </p>
                </div>
              </div>

              <div className="info-item">
                <FaPhoneAlt />
                <p>+91 8016380734</p>
              </div>

              <div className="info-item">
                <FaEnvelope />
                <p>contact@shuddhswad.shop</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="contact-map">
              <iframe
                title="Shuddh Swad Location"
                src="https://www.google.com/maps?q=Adra%20West%20Bengal&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
