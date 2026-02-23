import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import {
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { auth } = useAuth();

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    padding: "30px",
    transition: "0.3s",
  };

  const infoBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  };

  const iconStyle = {
    fontSize: "28px",
  };

  return (
    <Layout>
      <div
        className="container-fluid"
        style={{
          minHeight: "90vh",
          backgroundColor: "#f4f6f9",
          padding: "40px",
        }}
      >
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>

          {/* Dashboard Content */}
          <div className="col-md-9">
            <div style={cardStyle}>
              <h2
                style={{
                  marginBottom: "30px",
                  fontWeight: "700",
                  color: "#0d6efd",
                }}
              >
                <FaUserShield style={{ marginRight: "10px" }} />
                Admin Dashboard
              </h2>

              <div className="row">
                <div className="col-md-6">
                  <div style={infoBoxStyle}>
                    <FaUserShield style={{ ...iconStyle, color: "#0d6efd" }} />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6c757d",
                        }}
                      >
                        Admin Name
                      </p>
                      <h5 style={{ margin: 0 }}>{auth?.user?.name}</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={infoBoxStyle}>
                    <FaEnvelope style={{ ...iconStyle, color: "#198754" }} />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6c757d",
                        }}
                      >
                        Admin Email
                      </p>
                      <h5 style={{ margin: 0 }}>{auth?.user?.email}</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={infoBoxStyle}>
                    <FaPhone style={{ ...iconStyle, color: "#ffc107" }} />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6c757d",
                        }}
                      >
                        Admin Phone
                      </p>
                      <h5 style={{ margin: 0 }}>{auth?.user?.phone}</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={infoBoxStyle}>
                    <FaMapMarkerAlt
                      style={{ ...iconStyle, color: "#dc3545" }}
                    />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6c757d",
                        }}
                      >
                        Admin Address
                      </p>
                      <h5 style={{ margin: 0 }}>{auth?.user?.address}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
