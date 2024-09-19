import React from "react";

function MemberDetailsPopup({ isOpen, onClose, memberData}) {
  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>x</span>
          <h2>Member Details</h2>
          <p>Member ID: {memberData.id}</p>
          <p>Name: {memberData.name}</p>
          <p>Email: {memberData.surname}</p>
          {/* Render more member details as needed */}
      </div>
    </div>
  );
}

export default MemberDetailsPopup;
