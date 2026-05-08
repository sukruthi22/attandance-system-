import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import api from "./api";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Records from "./pages/Records";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceState, setAttendanceState] = useState([]);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  // Check for stored token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You could validate token here, but for now assume it's valid
      // In a real app, you'd decode the token or make an API call
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    showMessage("Logged out successfully");
  };

  // ✅ FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");

      setStudents(res.data);

      // 🔥 Important: update attendanceState also
      setAttendanceState(
        res.data.map((student) => ({
          ...student,
          markedStatus: student.status || "Present",
        }))
      );
    } catch (error) {
      console.log(error);
      showMessage("Backend not connected");
    }
  };

  // ✅ FETCH RECORDS
  const fetchRecords = async () => {
    try {
      const res = await api.get("/attendance/records");
      setRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 LOAD DATA ON START
  useEffect(() => {
    fetchStudents();
    fetchRecords();
  }, []);

  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  // Redirect to login if not authenticated and not on auth pages
  if (!currentUser && !hideLayout) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {!hideLayout ? (
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Topbar logout={logout} />

            {message && <div className="message-box">{message}</div>}

            <Routes>
              {/* DASHBOARD */}
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    students={students}
                    attendanceState={attendanceState}
                  />
                }
              />

              {/* STUDENTS */}
              <Route
                path="/students"
                element={
                  <Students
                    students={students}
                    setStudents={setStudents}
                    attendanceState={attendanceState}
                    setAttendanceState={setAttendanceState}
                    showMessage={showMessage}
                    fetchStudents={fetchStudents}
                  />
                }
              />

              {/* ATTENDANCE */}
              <Route
                path="/attendance"
                element={
                  <Attendance
                    attendanceState={attendanceState}
                    setAttendanceState={setAttendanceState}
                    students={students}
                    setStudents={setStudents}
                    setRecords={setRecords}
                    showMessage={showMessage}
                    fetchStudents={fetchStudents}
                    fetchRecords={fetchRecords}
                  />
                }
              />

              {/* RECORDS */}
              <Route path="/records" element={<Records records={records} />} />

              {/* REPORTS */}
              <Route
                path="/reports"
                element={
                  <Reports
                    attendanceState={attendanceState}
                    students={students}
                  />
                }
              />

              {/* PROFILE */}
              <Route
                path="/profile"
                element={<Profile currentUser={currentUser} />}
              />

              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setCurrentUser={setCurrentUser}
                showMessage={showMessage}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Signup
                setCurrentUser={setCurrentUser}
                showMessage={showMessage}
              />
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;