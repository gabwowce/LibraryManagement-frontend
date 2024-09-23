import React from 'react';
import exclamationIcon from '../assets/exclamation.svg';

function ToSmallScreenPage() {
  return (
    <div className="popup-overlay too-samall-screen">
      <div className="popup-content">
        <div className="confirmation-container">
          <img className="question-icon" src={exclamationIcon} alt="confirmation icon" />
          <div className="text-confirm">
            Your screen is too small to view this content properly. Please resize your browser window for the best experience.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToSmallScreenPage;
