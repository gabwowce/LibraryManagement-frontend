import React from "react";

function BtnPopupDetails({ btnClassName, btnContent, onButtonClick, icon }) {
  return (
    <button className={btnClassName} onClick={onButtonClick}>
      {icon ? (
        <span className="btn-icon">
          <img src={icon} alt="icon" />
        </span>
      ) : (
        btnContent || 'Details'
      )}
    </button>
  );
}

export default BtnPopupDetails;
