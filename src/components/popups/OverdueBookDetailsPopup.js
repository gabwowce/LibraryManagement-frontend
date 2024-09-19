import React from "react";

function OverdueBookDetailsPopup({ isOpen, onClose, overdueBookData}) {
  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>x</span>
          <h2>Member Details</h2>
          <p>Member ID: {overdueBookData.id}</p>
          <p>Name: {overdueBookData.name}</p>
          <p>Email: {overdueBookData.surname}</p>
          {/* Render more member details as needed */}
      </div>
    </div>
  );
}

export default OverdueBookDetailsPopup;
