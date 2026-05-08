import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>SmartAttend</h2>
        <p>Smart Classroom Attendance System</p>
      </div>

      <ul className="nav-list">
        <li><NavLink to="/dashboard" className="nav-item">Dashboard</NavLink></li>
        <li><NavLink to="/students" className="nav-item">Students</NavLink></li>
        <li><NavLink to="/attendance" className="nav-item">Mark Attendance</NavLink></li>
        <li><NavLink to="/records" className="nav-item">Attendance Records</NavLink></li>
        <li><NavLink to="/reports" className="nav-item">Reports</NavLink></li>
        <li><NavLink to="/profile" className="nav-item">Profile</NavLink></li>
      </ul>
    </aside>
  );
}

export default Sidebar;