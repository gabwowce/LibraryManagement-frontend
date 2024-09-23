import React, { useState, useRef, useEffect } from 'react';
import { useDataByIdContext } from '../../context/DataByIdContext';
import confirmationIcon from '../../assets/success.svg';

function ReturnBookPopup({ isOpen, onClose, memberData, returnBook }) {
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const dropdownRef = useRef(null);
    const statusRef = useRef(null);

    const [isUpdated, setIsUpdated] = useState(false); 

    const {fetchBookDataById, bookData} = useDataByIdContext();
    const [LoansData, setLoansData] = useState({
        title: '',
        bookId: '',
        year: ''
    });

    const activeLoans = memberData?.loans?.filter(loan => loan.status === "Active") || [];

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
                const bookDataArray = await Promise.all(
                    activeLoans.map(async (loan) => {
                        
                        const bookData = await fetchBookDataById(loan.bookId);
                 
                        return {
                            title: bookData.name,
                            bookId: bookData.id,
                            year: bookData.yearOfRelease,
                            loanId: loan.id
                        };
                    })
                );
          
                setLoansData(bookDataArray);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetchBooksData();
        
    }, []);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsBookDropdownOpen(false);
            }
            if (statusRef.current && !statusRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleBookDropdownToggle = () => {
        setIsBookDropdownOpen(!isBookDropdownOpen);
    };

    const handleLoanClick = (loan) => {
        setSelectedLoan(loan);
        setIsBookDropdownOpen(false);
    };

    const handleStatusClick = (status) => {
        setSelectedLoan(prev => ({ ...prev, status }));
        setIsStatusDropdownOpen(false);
    };

    const handleSave = () => {
        if (selectedLoan) {
            returnBook(selectedLoan.loanId, selectedLoan.status);
            setIsUpdated(true); 
            setConfirmationMessage('Book returned successfully!');
        }
        setTimeout(() => {
            onClose();
            window.location.reload();
          }, 10000);
    };

    const handleClose = () => {
        setConfirmationMessage('');
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
                            <h4 className="popup-title">Return a Book</h4>
                        </div>

                        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="borrowerId">Borrower ID</label>
                                <input
                                    type="text"
                                    id="borrowerId"
                                    value={memberData?.id || ""}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="borrowerName">Borrower</label>
                                <input
                                    type="text"
                                    id="borrowerName"
                                    value={`${memberData?.name} ${memberData?.surname}` || ""}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="activeBooks">Active Books</label>
                                <div className="status-filter" ref={dropdownRef}>
                                    <button
                                        className={`filter-btn book-picker ${isBookDropdownOpen ? 'open' : ''}  ${selectedLoan ? 'has-selected' : ''}`}
                                        onClick={handleBookDropdownToggle}
                                        type="button"
                                    >
                                        {selectedLoan ? `${selectedLoan.title} ${selectedLoan.year} (ID: ${selectedLoan.bookId})` : 'Select Active Book'}
                                    </button>
                                    {isBookDropdownOpen && (
                                        <div className="custom-dropdown-options">
                                            {LoansData.map((loan, index) => (
                                                <div
                                                    key={index}
                                                    className="custom-dropdown-option"
                                                    onClick={() => handleLoanClick(loan)}
                                                >
                                                    {`${loan.title} ${loan.year} (ID: ${loan.bookId})`}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <div className="status-filter" ref={statusRef}>
                                    <button
                                        className={`filter-btn ${isStatusDropdownOpen ? 'open' : ''} ${selectedLoan?.status ? 'has-selected' : ''}`}
                                        onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                        type="button"
                                    >
                                        {selectedLoan?.status || 'Select'}
                                    </button>
                                    {isStatusDropdownOpen && (
                                        <div className="custom-dropdown-options">
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
                                <button type="button" className="cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="button" className="save-btn" onClick={handleSave}>
                                    Return Book
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReturnBookPopup;
