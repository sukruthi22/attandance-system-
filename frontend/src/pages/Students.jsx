import React, { useState } from "react";
import api from "../api";

function Students({
  students,
  setStudents,
  attendanceState,
  setAttendanceState,
  showMessage,
  fetchStudents,
}) {
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    className: "",
    status: "Present",
  });

  // 🔍 Search filter
  const filtered = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      student.className.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add student (CONNECTED TO BACKEND)
  const addStudent = async () => {
    if (!form.rollNo || !form.name || !form.className) {
      showMessage("Please fill all student details");
      return;
    }

    try {
      await api.post("/students", form);

      showMessage("Student added successfully");

      // 🔄 refresh data from backend
      fetchStudents();

      // 🔄 reset form
      setForm({
        rollNo: "",
        name: "",
        className: "",
        status: "Present",
      });

    } catch (error) {
      console.log(error);

      // ⭐ SHOW BACKEND ERROR (IMPORTANT FIX)
      if (error.response && error.response.data.message) {
        showMessage(error.response.data.message);
      } else {
        showMessage("Failed to add student");
      }
    }
  };

  return (
    <section>
      {/* 📋 STUDENT TABLE */}
      <div className="panel">
        <div className="panel-header">
          <h2>Student List</h2>
          <input
            type="text"
            placeholder="Search student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((student, index) => (
              <tr key={student._id || index}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ ADD STUDENT FORM */}
      <div className="panel">
        <h2>Add New Student</h2>

        <div className="form-grid">
          <input
            type="text"
            placeholder="Roll Number"
            value={form.rollNo}
            onChange={(e) =>
              setForm({ ...form, rollNo: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Class Name"
            value={form.className}
            onChange={(e) =>
              setForm({ ...form, className: e.target.value })
            }
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>

        <br />

        <button className="primary-btn" onClick={addStudent}>
          Add Student
        </button>
      </div>
    </section>
  );
}

export default Students;