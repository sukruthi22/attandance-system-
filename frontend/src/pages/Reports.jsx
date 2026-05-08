import React from "react";

function Reports({ attendanceState, students }) {
  const total = students.length;
  const present = attendanceState.filter((s) => s.markedStatus === "Present").length;
  const absent = attendanceState.filter((s) => s.markedStatus === "Absent").length;
  const percentage = total ? ((present / total) * 100).toFixed(0) : 0;

  return (
    <section>
      <div className="panel">
        <h2>Attendance Reports</h2>
        <div className="report-box">
          <div className="report-item">
            <h3>Total Students</h3>
            <p>{total}</p>
          </div>
          <div className="report-item">
            <h3>Total Present</h3>
            <p>{present}</p>
          </div>
          <div className="report-item">
            <h3>Total Absent</h3>
            <p>{absent}</p>
          </div>
          <div className="report-item">
            <h3>Attendance Percentage</h3>
            <p>{percentage}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;