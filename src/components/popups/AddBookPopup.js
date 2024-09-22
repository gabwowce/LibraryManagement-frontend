import React, { useState, useEffect, useRef } from 'react';
import { useAddDataContext } from '../../context/AddDataContext';
import confirmationIcon from '../../assets/success.svg';

const categories = ['Children', 'Fantasy', 'Biography', 'History', 'Mystery', 'Romance'];

function AddBookPopup({ isOpen, onClose }) {
  const defaultImagePath = 'Images/Book20.jpg'; 
  const { addNewBookData, confirmationMessage } = useAddDataContext();

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    yearOfRelease: '',
    categoryId: undefined,
    categoryName: '',
    amount: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // Step 1: Define isUpdated state
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategoryClick = (category, index) => {
    setFormData((prev) => ({ 
      ...prev, 
      categoryId: index + 1, 
      categoryName: category  
    }));
    setIsDropdownOpen(false);
  };

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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        author: '',
        yearOfRelease: '',
        categoryId: undefined,
        categoryName: '',
        amount: '',
      });
      setIsUpdated(false); // Reset isUpdated when popup opens
    }
  }, [isOpen]);

  const handleSave = async () => {
    const { name, author, yearOfRelease, categoryId, amount } = formData; 
    if (!name || !author || !yearOfRelease || categoryId === undefined || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    const bookData = {
      name,
      author,
      yearOfRelease,
      categoryId, 
      amount,
      imagePath: defaultImagePath,
    };

    await addNewBookData(bookData);
    setIsUpdated(true); // Step 2: Set isUpdated to true

    setTimeout(() => {
      onClose();
      // Optionally reload the page here if needed.
    }, 10000); 
  };

  const handleClose = () => {
    onClose();
    if (isUpdated) {
      window.location.reload(); // Step 3: Refresh only if isUpdated is true
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
              <h4 className="popup-title">Add New Book</h4>
            </div>
            <form className="form-container">
              <div className="form-group">
                <label htmlFor="name">Book Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <div className="status-filter" ref={dropdownRef}>
                  <button
                    className={`filter-btn category-picker ${isDropdownOpen ? 'open' : ''}`}
                    onClick={handleDropdownToggle}
                  >
                    {formData.categoryName || 'Select'}
                  </button>
                  {isDropdownOpen && (
                    <div className="custom-dropdown-options book-category">
                      {categories.map((category, index) => (
                        <div
                          key={index} // Changed from category.id to index
                          className="custom-dropdown-option"
                          onClick={() => handleCategoryClick(category, index)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className='form-grouped-group'>
                <div className="form-group">
                  <label htmlFor="yearOfRelease">Year</label>
                  <input type="text" id="yearOfRelease" name="yearOfRelease" value={formData.yearOfRelease} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
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

export default AddBookPopup;
