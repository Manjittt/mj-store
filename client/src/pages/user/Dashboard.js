import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <Layout title={"Dashboard"}>
      <div
        className="container-fluid py-4 px-3"
        style={{ background: "#f8f9fa", minHeight: "90vh" }}
      >
        <div className="row">
          {/* SIDEBAR */}
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-9">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "15px",
                background: "#ffffff",
              }}
            >
              <div className="card-body p-4">
                <h2 className="mb-4 text-primary fw-bold">👋 Welcome Back</h2>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded shadow-sm h-100">
                      <h6 className="text-muted">Full Name</h6>
                      <h5 className="fw-semibold">{auth?.user?.name}</h5>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded shadow-sm h-100">
                      <h6 className="text-muted">Email Address</h6>
                      <h5 className="fw-semibold">{auth?.user?.email}</h5>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded shadow-sm h-100">
                      <h6 className="text-muted">Shipping Address</h6>
                      <h5 className="fw-semibold">
                        {auth?.user?.address || "Not Provided"}
                      </h5>
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

export default Dashboard;
