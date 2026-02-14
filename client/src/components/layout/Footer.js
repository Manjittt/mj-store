import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#111",
      color: "#eee",
      paddingTop: "40px",
      fontSize: "14px",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "30px",
      padding: "0 40px",
    },
    section: {
      lineHeight: "1.8",
    },
    heading: {
      color: "#f4b400",
      marginBottom: "15px",
      fontSize: "16px",
    },
    text: {
      color: "#ccc",
      margin: "6px 0",
    },
    link: {
      display: "block",
      color: "#ccc",
      textDecoration: "none",
      margin: "6px 0",
    },
    icon: {
      marginRight: "8px",
      color: "#f4b400",
    },
    socialRow: {
      display: "flex",
      gap: "12px",
      marginTop: "10px",
    },
    socialIcon: {
      width: "38px",
      height: "38px",
      backgroundColor: "#222",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "16px",
      textDecoration: "none",
    },
    whatsapp: {
      backgroundColor: "#25d366",
    },
    bottom: {
      textAlign: "center",
      marginTop: "30px",
      padding: "15px",
      backgroundColor: "#000",
      color: "#aaa",
      fontSize: "13px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company Info */}
        <div style={styles.section}>
          <h4 style={styles.heading}>DesiSwaad</h4>
          <p style={styles.text}>
            Authentic Indian food delivered with love. Real desi flavors at your
            doorstep.
          </p>
        </div>

        {/* Contact */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>
            <i className="fas fa-phone" style={styles.icon}></i>
            +91 98765 43210
          </p>
          <p style={styles.text}>
            <i className="fas fa-envelope" style={styles.icon}></i>
            support@desiswaad.com
          </p>
          <p style={styles.text}>
            <i className="fas fa-map-marker-alt" style={styles.icon}></i>
            Varanasi, Uttar Pradesh, India
          </p>
        </div>

        {/* Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <Link to="/about" style={styles.link}>
            About
          </Link>
          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
          <Link to="/policy" style={styles.link}>
            Privacy Policy
          </Link>
        </div>

        {/* Social + WhatsApp */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialRow}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.socialIcon, ...styles.whatsapp }}
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} DesiSwaad. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
