import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title="About us - Ecommerce app">
      <div
        className="container"
        style={{
          backgroundColor: "#f8f9fa",
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
              src="https://static.vecteezy.com/system/resources/previews/039/322/213/non_2x/call-center-worker-using-headset-in-modern-office-receive-calls-from-clients-in-front-of-the-computer-woman-with-phone-calling-to-customer-support-service-concept-flat-illustration-vector.jpg"
              alt="About us"
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
                color: "#333",
                marginBottom: "20px",
              }}
            >
              Welcome to E-Shopping
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#555",
                marginBottom: "15px",
              }}
            >
              E-Shopping is your one-stop online store, offering a wide range of
              high-quality products at unbeatable prices. From fashion to
              electronics and home essentials, we make shopping easy, fast, and
              convenient.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#555",
              }}
            >
              <strong>Why E-Shopping?</strong> We’re committed to providing a
              seamless shopping experience with secure payment options, fast
              shipping, and hassle-free returns. Our carefully curated selection
              ensures you get the best products every time.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
