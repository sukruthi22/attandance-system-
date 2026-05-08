import React from "react";

function Profile({ currentUser }) {
  return (
    <section>
      <div className="panel">
        <h2>User Profile</h2>
        <div className="profile-box">
          <div className="profile-avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <br />
            <p><strong>Email:</strong> {currentUser.email}</p>
            <br />
            <p><strong>Role:</strong> {currentUser.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;