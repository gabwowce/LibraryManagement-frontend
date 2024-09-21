import React, { useState, useEffect, useRef } from 'react';
import { useUpdateDataContext } from '../../context/UpdateDataContext';
import confirmationIcon from '../../assets/success.svg';


function MemberDetailsPopup({ isOpen, onClose, memberData}) {
  const { updateMemberData, confirmationMessage } = useUpdateDataContext();
  const [editData, setEditData] = useState(memberData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const statusRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setEditData(memberData);
  }, [memberData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editData.id) {

        if (editData) {
            await updateMemberData(editData.id, editData);
            setIsUpdated(true);
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 100000);
        } 
    } 
};


  const handleClose = () => {
    onClose();
    if (isUpdated) {
        window.location.reload(); 
    }
  };


  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {confirmationMessage ? (
          <div className="confirmation-container">
            <img
              className="confirmation-icon"
              src={confirmationIcon}
              alt="confirmation icon"
            />
            <div className="text-success">Success</div>
            <div className="confirmation-message">{confirmationMessage}</div>
            <button className="confirmation-ok-btn" onClick={handleClose}>OK</button>
          </div>
        ) : (
          <>
            <span className="close-btn" onClick={handleClose}>
              x
            </span>
            <div className='popup-title-container'>
              <h4 className="popup-title">Member Details</h4>
            </div>
           
            <form className="form-container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={editData.surname || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="text"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={editData.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editData.phoneNumber || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
  
export default MemberDetailsPopup;
  