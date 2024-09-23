import React, { useState, useEffect, useRef } from 'react';
import { useAddDataContext } from '../../context/AddDataContext';
import confirmationIcon from '../../assets/success.svg';


const addOneMonth = (date) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result.toISOString().split('T')[0];
};

function AddNewLoanPopup({ isOpen, onClose, memberData }) {
  const { addNewLoanData, confirmationMessage } = useAddDataContext();
  

  const todayDate = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    memberId: memberData.id,
    bookId: '',
    dateOfLoan: todayDate,
    endDate: addOneMonth(todayDate), 
    status: 'Active'
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      memberId: memberData.id
    }));
  }, [memberData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    

    if (name === 'dateOfLoan') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        endDate: addOneMonth(value) 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    if (formData.bookId && formData.dateOfLoan) {
      await addNewLoanData(formData); 
      setIsUpdated(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 10000);
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
            <img className="confirmation-icon" src={confirmationIcon} alt="confirmation icon" />
            <div className="text-success">Success</div>
            <div className="confirmation-message">{confirmationMessage}</div>
            <button className="confirmation-ok-btn" onClick={handleClose}>OK</button>
          </div>
        ) : (
          <>
            <span className="close-btn" onClick={handleClose}>x</span>
            <div className="popup-title-container">
              <h4 className="popup-title">Lend a Book</h4>
            </div>
            
            <form className="form-container">
              <div className="form-group">
                <label htmlFor="name">Borrower ID</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={memberData.id || ""}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Borrower</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={memberData.name + " " + memberData.surname || ""}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="bookId">Book ID</label>
                <input
                  type="text"
                  id="bookId"
                  name="bookId"
                  value={formData.bookId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfLoan">Start Date</label>
                <input
                  type="date"
                  id="dateOfLoan"
                  name="dateOfLoan"
                  value={formData.dateOfLoan}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date (One month later)</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  disabled
                />
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

export default AddNewLoanPopup;
