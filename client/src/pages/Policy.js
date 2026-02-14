import React from "react";
import Layout from "../components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy - Sudh Swaad"}>
      <div
        className="container mt-5"
        style={{
          backgroundColor: "#fff7f0",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          minHeight: "70vh",
          color: "#555",
          lineHeight: "1.8",
        }}
      >
        <h2 style={{ color: "#d35400", marginBottom: "20px" }}>
          Privacy Policy
        </h2>
        <p>Effective Date: January 31, 2026</p>

        <p>
          At <strong>Sudh Swaad</strong>, your privacy is important to us. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you order our homemade snacks online.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>
          1. Information We Collect
        </h3>
        <p>
          We may collect personal information you provide directly, such as your
          name, email, delivery address, phone number, and payment details when
          you place an order or contact us.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>
          2. How We Use Your Information
        </h3>
        <p>We use your information to:</p>
        <ul>
          <li>Process and deliver your snack orders accurately.</li>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Notify you about new homemade snacks, offers, or updates.</li>
          <li>Improve our services and website experience.</li>
        </ul>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>
          3. How We Protect Your Information
        </h3>
        <p>
          We use secure systems and industry-standard measures to protect your
          personal data, including encryption and secure payment gateways.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>
          4. Sharing Your Information
        </h3>
        <p>
          We do not sell or share your personal information with third parties,
          except as required to process orders (like delivery partners) or by
          law.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>5. Your Rights</h3>
        <p>
          You can request to access, update, or delete your personal information
          anytime. Contact us using the details below to exercise your rights.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>6. Cookies</h3>
        <p>
          Our website uses cookies to enhance your browsing experience and help
          us understand how customers use our site. You can disable cookies in
          your browser settings, but some features may not work properly.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>
          7. Changes to This Policy
        </h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated effective date. Please review
          it periodically.
        </p>

        <h3 style={{ color: "#d35400", marginTop: "25px" }}>8. Contact Us</h3>
        <p>
          For any questions or concerns about this Privacy Policy or our
          homemade snacks, contact us at:
        </p>
        <p>
          Email: <strong>support@sudhswaad.com</strong>
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
