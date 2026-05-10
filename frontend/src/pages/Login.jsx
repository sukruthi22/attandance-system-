import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login({ setCurrentUser, showMessage }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showMessage("Please enter email and password");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      setCurrentUser(user);
      showMessage("Login successful");
      alert("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Login failed";
      showMessage(message);
      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>SmartAttend</h1>
        <p>Login to your classroom attendance dashboard</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={loginUser}>Login</button>

        <div className="switch-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;