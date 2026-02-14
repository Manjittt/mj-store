import React from "react";
import Layout from "../components/layout/Layout";
import logo from "../assets/Logo.png";



const About = () => {
  return (
    <Layout title="About us - Sudh Swaad">
      <div
        className="container"
        style={{
          backgroundColor: "#fff7f0",
          minHeight: "77vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="row align-items-center w-100">
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={logo}
              alt="Sudh Swaad Homemade Snacks"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                color: "#d35400",
                marginBottom: "20px",
              }}
            >
              Welcome to Sudh Swaad
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#555",
                marginBottom: "15px",
              }}
            >
              Sudh Swaad brings you the finest homemade snacks made with love
              and the freshest ingredients. From crispy gujiyas and salted
              peanuts to crunchy maakhana, every bite is a taste of tradition
              and care.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#555",
              }}
            >
              <strong>Why choose Sudh Swaad?</strong> We are dedicated to
              delivering authentic flavors with quality you can trust. Enjoy
              freshly prepared snacks, made in small batches, with secure
              delivery to your doorstep. Experience homemade goodness in every
              bite!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
