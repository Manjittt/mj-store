import React, { useState } from "react";
import Layout from "../components/layout/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle sending the form data to a server or email service
    setFormSubmitted(true);
  };

  return (
    <Layout title={"Contact Us"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <p>
              If you have any questions, feel free to reach out to us via the
              form below:
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            {formSubmitted && (
              <div className="alert alert-success mt-3">
                Thank you for reaching out! We'll get back to you shortly.
              </div>
            )}
          </div>

          <div className="col-md-6">
            
            <img
              src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-3147.jpg?t=st=1741767076~exp=1741770676~hmac=e53e61dce350fb11a8640ab2fc2214f3f2d0965d870a299a7ef216d5ee148295&w=1480"
              alt="Contact us"
              style={{ width: "80%" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
