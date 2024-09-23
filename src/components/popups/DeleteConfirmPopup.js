import React, { useState, useEffect } from 'react';
import confirmationIcon from '../../assets/success.svg';
import errorIcon from '../../assets/error.svg';
import questionIcon from '../../assets/question.svg';

const DeleteConfirmPopup = ({ isOpen, onClose, confirmationMessage, errorMessage, onConfirm, question }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
  
    useEffect(() => {
      if (isConfirmed) {
        const timer = setTimeout(() => {
          onClose();
          window.location.reload();  
        }, 10000);
        return () => clearTimeout(timer);
      }
    }, [isOpen, onClose]);
  
    const handleConfirm = async () => {
      await onConfirm(); 
      setIsConfirmed(true); 
    };
  
    const handleCancel = () => {
      setIsConfirmed(false);
      onClose();
    };

    const handleClose =()=>{        
        onClose();
        window.location.reload();       
    }
  
    if (!isOpen) return null;
  
    return (
        <div className="popup-overlay">
          <div className="popup-content">
            {!isConfirmed ? (
              <div className="confirmation-container">
                 <img className="question-icon" src={questionIcon} alt="confirmation icon" />
                <div className="text-confirm">{question}</div>
                <div className='confirmation-btns-group'>
                    <button className="confirmation-cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button className="confirmation-confirm-btn" onClick={handleConfirm}>Confirm</button>
                </div>
                
              </div>
            ) : (
              confirmationMessage ? (
                <div className="confirmation-container">
                  <img className="confirmation-icon" src={confirmationIcon} alt="confirmation icon" />
                  <div className="text-success">Success</div>
                  <div className="confirmation-message">{confirmationMessage}</div>
                  <button className="confirmation-ok-btn" onClick={handleClose}>OK</button>
                </div>
              ) : (
                errorMessage && (
                  <div className="error-container">
                    <img className="error-icon" src={errorIcon} alt="error icon" />
                    <div className="text-error">Error</div>
                    <div className="error-message">{errorMessage}</div>
                    <button className="error-ok-btn" onClick={onClose}>OK</button>
                  </div>
                )
              )
            )}
          </div>
        </div>
      );
    }

  export default DeleteConfirmPopup;

  