import React from "react";

function BookDetailsPopup({ isOpen, onClose, bookData}) {
  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>x</span>
          <h2>Member Details</h2>
          <p>Member ID: {bookData.id}</p>
          <p>Name: {bookData.name}</p>
          <p>Email: {bookData.surname}</p>
          {/* Render more member details as needed */}
      </div>
    </div>
  );
}

export default BookDetailsPopup;
