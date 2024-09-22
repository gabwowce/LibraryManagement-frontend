import React, { useState, useEffect, useRef } from 'react';
import { useUpdateDataContext } from '../../context/UpdateDataContext';
import confirmationIcon from '../../assets/success.svg';

function OverdueBookDetailsPopup({ isOpen, onClose, overdueBookData }) {
    const { updateOverdueBookData, confirmationMessage } = useUpdateDataContext();
    const [editData, setEditData] = useState(overdueBookData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);


    const statusRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setEditData(overdueBookData);
    }, [overdueBookData]);

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

    const handleStatusClick = (status) => {
        setEditData((prev) => ({ ...prev, status }));
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSave = async () => {
      if (editData.id) {
          const updatedData = {};
          
          if (editData.loanEndDate !== overdueBookData.loanEndDate) {
              updatedData.newEndDate = editData.loanEndDate;
          }
          
          if (editData.status !== overdueBookData.status) {
              updatedData.status = editData.status;
          }
          console.log('----> --------->Updated Data:', updatedData);

          

          // Siunciame atnaujintus duomenis tik jei yra kas nors atnaujinta
          if (Object.keys(updatedData).length > 0) {
              await updateOverdueBookData(editData.id, updatedData);
              setIsUpdated(true);
                setTimeout(() => {
                  onClose();
                  window.location.reload();
              }, 10000);
              
          } else {
              console.log('No changes to update.');
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
                      <h4 className='popup-title'>Overdue Book Details</h4>
                    </div>
                    
                    <form className="form-container">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editData.title || ''}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={editData.author || ''}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="borrowerName">Borrower</label>
                            <input
                                type="text"
                                id="borrowerName"
                                name="borrowerName"
                                value={editData.borrowerName || ''}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loanStartDate">Loan Start Date</label>
                            <input
                                type="text"
                                id="loanStartDate"
                                name="loanStartDate"
                                value={editData.loanStartDate || ''}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loanEndDate">Loan End Date</label>
                            <input
                                type="date"
                                id="loanEndDate"
                                name="loanEndDate"
                                value={editData.loanEndDate || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <div className="status-filter" ref={statusRef}>
                                <button
                                    className={`filter-btn ${isDropdownOpen ? 'open' : ''}`}
                                    onClick={handleDropdownToggle}
                                >
                                    {editData.status || 'Select Status'}
                                </button>
                                {isDropdownOpen && (
                                    <div className="custom-dropdown-options book-status" ref={dropdownRef}>
                                        <div className="custom-dropdown-option" onClick={() => handleStatusClick('Active')}>
                                            Active
                                        </div>
                                        <div className="custom-dropdown-option" onClick={() => handleStatusClick('Returned')}>
                                            Returned
                                        </div>
                                    </div>
                                )}
                            </div>
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

export default OverdueBookDetailsPopup;
