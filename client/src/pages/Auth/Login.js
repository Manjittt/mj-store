import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuth] = useAuth(); // ignore unused auth

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });

      if (res && res.data.success) {
        toast.success(res.data.message);
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
    <Layout title="Login - E-Shopping App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
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
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => navigate("/forget-password")}
          >
            Forgot Password
          </button>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate("/register")}
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
