import React, { useState, useEffect, useRef } from 'react';
import CustomDatePicker from './CustomDatePicker'; 

function OverdueBooksFilter() {
    const [isLoanStartOpen, setLoanStartOpen] = useState(false);
    const [isDaysOverdueOpen, setDaysOverdueOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOrder, setSelectedOrder] = useState('Ascending');

    const loanStartRef = useRef(null);
    const daysOverdueRef = useRef(null);

    const handleStartDayFilter = () => {
        setLoanStartOpen((prevState) => !prevState);
        setDaysOverdueOpen(false);
    };

    const handleDaysOverdueFilter = () => {
        setDaysOverdueOpen((prevState) => !prevState);
        setLoanStartOpen(false);
    };

    const handleOrderChange = (order) => {
        setSelectedOrder(order);
        setDaysOverdueOpen(false);
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
                    Date
                </button>
                {isLoanStartOpen && (
                    <div className="custom-dropdown-options">
                        <CustomDatePicker
                            startDate={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                )}
            </div>
            <div className="days-overdue-filter" ref={daysOverdueRef}>
                <button className={`filter-btn ${isDaysOverdueOpen ? 'open' : ''}`} onClick={handleDaysOverdueFilter}>
                    Days Overdue
                </button>
                {isDaysOverdueOpen && (
                    <div className="custom-dropdown-options">
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
                <button className="reset-btn">
                    <img src="/reset.png" alt="reset icon" /> Reset Filters
                </button>
            </div>
        </div>
    );
}

export default OverdueBooksFilter;
