import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Signup({ setCurrentUser, showMessage }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Teacher",
    password: "",
  });

  const signupUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      showMessage("Please fill all signup fields");
      return;
    }

    try {
      const response = await api.post("/auth/register", form);
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      setCurrentUser(user);
      showMessage("Account created successfully");
      alert("registeed")
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Signup failed";
      showMessage(message);
      alert(message)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>
        <p>Sign up for Smart Classroom Attendance System</p>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="auth-btn" onClick={signupUser}>Create Account</button>

        <div className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;