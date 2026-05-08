import React from "react";
import api from "../api";

function Attendance({
  attendanceState,
  setAttendanceState,
  students,
  setStudents,
  setRecords,
  showMessage,
  fetchStudents,
  fetchRecords,
}) {
  const markAttendance = (index, status) => {
    const updated = [...attendanceState];
    updated[index].markedStatus = status;
    setAttendanceState(updated);
  };

  // 🔥 UPDATED FUNCTION (CONNECTED TO BACKEND)
  const saveAttendance = async () => {
    try {
      const res = await api.post("/attendance", {
        attendance: attendanceState,
      });

      setRecords(res.data.records);

      showMessage(res.data.message);

      // refresh data from backend
      fetchStudents();
      fetchRecords();
    } catch (error) {
      console.log(error);
      showMessage("Failed to save attendance");
    }
  };

  return (
    <section>
      <div className="panel">
        <div className="panel-header">
          <h2>Mark Attendance</h2>
          <button className="primary-btn" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>

        <div className="attendance-grid">
          {attendanceState.map((student, index) => (
            <div className="student-card" key={student._id || index}>
              <div className="student-info">
                <h4>{student.name}</h4>
                <p>Roll No: {student.rollNo}</p>
                <p>Class: {student.className}</p>
                <p>
                  <strong>Status:</strong> {student.markedStatus}
                </p>
              </div>

              <div className="attendance-actions">
                <button
                  className="present-btn"
                  onClick={() => markAttendance(index, "Present")}
                >
                  Present
                </button>

                <button
                  className="absent-btn"
                  onClick={() => markAttendance(index, "Absent")}
                >
                  Absent
                </button>

                <button
                  className="late-btn"
                  onClick={() => markAttendance(index, "Late")}
                >
                  Late
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Attendance;