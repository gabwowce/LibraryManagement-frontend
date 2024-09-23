import React, { useState, useEffect, useRef } from 'react';
import { useUpdateDataContext } from '../../context/UpdateDataContext';
import confirmationIcon from '../../assets/success.svg';

function BookDetailsPopup({ isOpen, onClose, bookData }) {
    const categories = ['Children', 'Fantasy', 'Biography', 'History', 'Mystery', 'Romance'];

    const { confirmationMessage, updateBookData } = useUpdateDataContext();
    const [editData, setEditData] = useState({ ...bookData, category: 0 });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (bookData) {
            const categoryIndex = categories.indexOf(bookData.category);
            setEditData((prev) => ({
                ...bookData,
                category: categoryIndex >= 0 ? categoryIndex : 0, // Set to index or default
            }));
        }
    }, [bookData]); // Only run when bookData changes

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

    const handleDropdownToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen((prev) => !prev);
    };

    const handleCategoryClick = (index) => {
        setEditData((prev) => ({ ...prev, category: index })); // Store the index
        setIsDropdownOpen(false);
    };

    const handleSave = async () => {
        if (editData.id) {
            const updatedData = {
                Name: editData.name,
                Author: editData.author,
                YearOfRelease: parseInt(editData.yearOfRelease, 10),
                CategoryId: editData.category + 1, // 1-based index
                Amount: parseInt(editData.amount, 10),
            };

            // Log updated data
            console.log('--->updatedData: ' + JSON.stringify(updatedData));

            if (Object.keys(updatedData).length > 0) {
                await updateBookData(editData.id, updatedData);
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
                        <img className="confirmation-icon" src={confirmationIcon} alt="confirmation icon" />
                        <div className="text-success">Success</div>
                        <div className="confirmation-message">{confirmationMessage}</div>
                        <button className="confirmation-ok-btn" onClick={handleClose}>OK</button>
                    </div>
                ) : (
                    <>
                        <span className="close-btn" onClick={handleClose}>x</span>
                        <div className='popup-title-container'>
                            <h4 className='popup-title'>Book Details</h4>
                        </div>
                        
                        <form className="form-container">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" value={editData.name || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input type="text" id="author" name="author" value={editData.author || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Year">Year</label>
                                <input type="text" id="Year" name="Year" value={editData.yearOfRelease || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <div className="status-filter" ref={dropdownRef}>
                                    <button className={`filter-btn category-picker ${isDropdownOpen ? 'open' : ''}`} onClick={handleDropdownToggle}>
                                        {categories[editData.category] || 'Select Category'}
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="custom-dropdown-options book-category">
                                            {categories.map((category, index) => (
                                                <div key={index} className="custom-dropdown-option" onClick={() => handleCategoryClick(index)}>
                                                    {category}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input type="text" id="amount" name="amount" value={editData.amount || ''} onChange={handleChange} />
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

export default BookDetailsPopup;
