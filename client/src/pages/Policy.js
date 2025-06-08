import React from "react";
import Layout from "../components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-5">
        <h2>Privacy Policy</h2>
        <p>Effective Date: March 12, 2025</p>

        <p>
          Your privacy is important to us. This privacy policy explains how we
          collect, use, and protect your personal information when you visit our
          website.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We may collect personal information that you provide directly to us,
          such as your name, email address, and any other information you
          provide through forms on our website.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Improve our website and services.</li>
          <li>
            Send you important updates or information related to your use of our
            services.
          </li>
        </ul>

        <h3>3. How We Protect Your Information</h3>
        <p>
          We use industry-standard security measures to protect your personal
          data from unauthorized access, alteration, or destruction.
        </p>

        <h3>4. Sharing Your Information</h3>
        <p>
          We do not share, sell, or rent your personal information to third
          parties unless required by law or as necessary to provide our
          services.
        </p>

        <h3>5. Your Rights</h3>
        <p>
          You have the right to access, update, or delete your personal
          information at any time. If you wish to exercise these rights, please
          contact us using the information below.
        </p>

        <h3>6. Cookies</h3>
        <p>
          Our website uses cookies to enhance your experience and analyze site
          traffic. You can choose to disable cookies in your browser settings,
          but some features of our website may not function properly without
          them.
        </p>

        <h3>7. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date. Please review
          this page periodically for any updates.
        </p>

        <h3>8. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          Email: <strong>support@example.com</strong>
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
