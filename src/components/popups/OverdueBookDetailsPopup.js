import React, { useState, useEffect, useRef } from 'react';
import config from '../../config';

function OverdueBookDetailsPopup({ isOpen, onClose, overdueBookData }) {
  const [editData, setEditData] = useState(overdueBookData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(editData.status || '');

  const statusRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setEditData(overdueBookData);
    setSelectedStatus(overdueBookData.status || '');
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/books/overdue/${editData.loanID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanEndDate: editData.loanEndDate,
          status: selectedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update overdue book data');
      }

      onClose(); // Close the popup
    } catch (error) {
      console.error('Error updating overdue book data:', error);
    }
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setEditData((prev) => ({ ...prev, status }));
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    e.stopPropagation(); // Prevent event from bubbling up
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>x</span>
        <h2 className='popup-title'>Overdue Book Details</h2>
        <form className="overdue-book-form">
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
                {selectedStatus || 'Select Status'}
              </button>
              {isDropdownOpen && (
                <div className="custom-dropdown-options status" ref={dropdownRef}>
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
      </div>
    </div>
  );
}

export default OverdueBookDetailsPopup;
