import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { FaUserPlus } from "react-icons/fa"; // Importing the icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - E-Shopping App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="emailInput"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="passwordInput"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forget-password");
            }}
          >
            Forgot Password
          </button>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>

          {/* Register Button with Icon */}
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate("/register")} // Navigate to Register page
            >
              <FaUserPlus /> New User? Please Register here
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
