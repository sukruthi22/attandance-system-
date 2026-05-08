import React from "react";

function Dashboard({ students, attendanceState }) {
  const total = students.length;
  const present = attendanceState.filter((s) => s.markedStatus === "Present").length;
  const absent = attendanceState.filter((s) => s.markedStatus === "Absent").length;
  const percentage = total ? ((present / total) * 100).toFixed(0) : 0;

  return (
    <section className="page active">
      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Present Today</h3>
          <p>{present}</p>
        </div>
        <div className="card">
          <h3>Absent Today</h3>
          <p>{absent}</p>
        </div>
        <div className="card">
          <h3>Attendance %</h3>
          <p>{percentage}%</p>
        </div>
      </div>

      <div className="panel">
        <h2>Attendance Overview</h2>
        <p>This dashboard helps teachers and admins monitor student attendance.</p>
        <div className="progress-box">
          <strong>Overall Attendance Progress</strong>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;