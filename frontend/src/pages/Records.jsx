import React from "react";

function Records({ records }) {
  return (
    <section>
      <div className="panel">
        <h2>Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.rollNo}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Records;