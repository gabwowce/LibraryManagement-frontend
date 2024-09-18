import React, { useState, useEffect, useRef } from 'react';
import CustomDatePicker from './CustomDatePicker'; 

function OverdueBooksFilter({ onApplyFilters }) {
    const [isLoanStartOpen, setLoanStartOpen] = useState(false);
    const [isDaysOverdueOpen, setDaysOverdueOpen] = useState(false);
    const [startDate, setStartDate] = useState(null); 
    const [selectedOrder, setSelectedOrder] = useState(''); // Default order
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const loanStartRef = useRef(null);
    const daysOverdueRef = useRef(null);

    const handleStartDayFilter = () => {
        setLoanStartOpen(prevState => !prevState);
        if (isDaysOverdueOpen) setDaysOverdueOpen(false); // Close other filter
    };

    const handleDaysOverdueFilter = () => {
        setDaysOverdueOpen(prevState => !prevState);
        if (isLoanStartOpen) setLoanStartOpen(false); // Close other filter
    };

    const handleOrderChange = (order) => {
        setSelectedOrder(order);
        setDaysOverdueOpen(false);
        setIsFilterApplied(true); // Mark filter as applied
    };

    const handleStartDateChange = () => {
        setLoanStartOpen(false);
        setIsFilterApplied(true);
    };

    const handleResetFilters = () => {
        setStartDate(null); 
        setSelectedOrder(''); 
        setLoanStartOpen(false);
        setDaysOverdueOpen(false);
        setIsFilterApplied(true); // Mark filter as applied
    };

    const handleApplyFilters = () => {
        onApplyFilters(startDate, selectedOrder); 
        setIsFilterApplied(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                loanStartRef.current && !loanStartRef.current.contains(event.target) &&
                daysOverdueRef.current && !daysOverdueRef.current.contains(event.target)
            ) {
                setLoanStartOpen(false);
                setDaysOverdueOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isLoanStartOpen && !isDaysOverdueOpen && isFilterApplied) {
            handleApplyFilters();
        }
    }, [isLoanStartOpen, isDaysOverdueOpen, isFilterApplied]);

    useEffect(() => {
        if (isFilterApplied) {
            handleApplyFilters();
        }
    }, [startDate, selectedOrder]);

    const formatDate = (date) => {
        if (!date) return 'Date'; 
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="overdue-filter-container">
            <div className="filter-img">
                <img src="/filter.png" alt="Filter Icon" />
            </div>
            <div className="filter-hint">
                <h4>Filter By</h4>
            </div>
            <div className="loan-start-day-filter" ref={loanStartRef}>
                <button className={`filter-btn ${isLoanStartOpen ? 'open' : ''}`} onClick={handleStartDayFilter}>
                    {formatDate(startDate)} 
                </button>
                {isLoanStartOpen && (
                    <div className="custom-dropdown-options">
                        <CustomDatePicker
                            startDate={startDate || new Date()} 
                            onChange={(date) => setStartDate(date)}
                            onClick={handleStartDateChange}
                            
                        />
                    </div>
                )}
            </div>
            <div className="days-overdue-filter" ref={daysOverdueRef}>
                <button className={`filter-btn ${isDaysOverdueOpen ? 'open' : ''}`} onClick={handleDaysOverdueFilter}>
                    Days Overdue
                </button>
                {isDaysOverdueOpen && (
                    <div className="custom-dropdown-options order">
                        <div className="custom-dropdown-option" onClick={() => handleOrderChange('Ascending')}>
                            Ascending
                        </div>
                        <div className="custom-dropdown-option" onClick={() => handleOrderChange('Descending')}>
                            Descending
                        </div>
                    </div>
                )}
            </div>
            <div className="reset-filter-btn">
                <button className="reset-btn" onClick={handleResetFilters}>
                    <img src="/reset.png" alt="reset icon" /> Reset Filters
                </button>
            </div>
        </div>
    );
}

export default OverdueBooksFilter;
