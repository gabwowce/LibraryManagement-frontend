import React, { useState } from 'react';
import { useAddDataContext } from '../../context/AddDataContext';

function AddBookPopup({ isOpen, onClose }) {
  const { addNewMemberData, confirmationMessage } = useAddDataContext();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dateOfBirth: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { name, surname, dateOfBirth, phoneNumber } = formData;
    if (!name || !surname || !dateOfBirth || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    await addNewMemberData(formData); // Įrašome naują narį
    setFormData({ name: '', surname: '', dateOfBirth: '', phoneNumber: '' }); // Išvalome formą
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {confirmationMessage ? (
          <div className="confirmation-container">
            <div className="text-success">Success</div>
            <div className="confirmation-message">{confirmationMessage}</div>
            <button className="confirmation-ok-btn" onClick={onClose}>OK</button>
          </div>
        ) : (
          <>
            <span className="close-btn" onClick={onClose}>x</span>
            <div className='popup-title-container'>
              <h4 className="popup-title">Add New Member</h4>
            </div>
            <form className="form-container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input type="text" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                <button type="button" className="save-btn" onClick={handleSave}>Save Changes</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AddBookPopup;
