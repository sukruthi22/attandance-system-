import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Topbar({ logout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const titles = {
    "/dashboard": "Dashboard",
    "/students": "Students",
    "/attendance": "Mark Attendance",
    "/records": "Attendance Records",
    "/reports": "Reports",
    "/profile": "Profile",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div>
        <h1>{titles[location.pathname] || "Dashboard"}</h1>
        <p>Welcome to Smart Classroom Attendance System</p>
      </div>
      <div className="topbar-right">
        <button className="secondary-btn">Today</button>
        <button className="danger-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;