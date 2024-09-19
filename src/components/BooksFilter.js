import React, { useState, useEffect, useRef } from 'react';
import CustomYearPicker from '../components/custom/CustomYearPicker'; 
import CustomCategoryPicker from '../components/custom/CustomCategoryPicker'; 

function BooksFilter({ onApplyFilters }) {
    const [isYearOpen, setYearOpen] = useState(false);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null); 
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const yearRef = useRef(null);
    const categoryRef = useRef(null);

    const handleYearFilter = () => {
        setYearOpen(prevState => !prevState);
        if (isCategoryOpen) setCategoryOpen(false); 
    };

    const handleCategoryFilter = () => {
        setCategoryOpen(prevState => !prevState);
        if (isYearOpen) setYearOpen(false); 
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setYearOpen(false);
        setIsFilterApplied(true); 
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCategoryOpen(false);
        setIsFilterApplied(true); 
    };

    const handleResetFilters = () => {
        setSelectedYear(null); 
        setSelectedCategory(''); 
        setYearOpen(false);
        setCategoryOpen(false);
        setIsFilterApplied(true); 
    };

    const handleApplyFilters = () => {
        onApplyFilters(selectedYear, selectedCategory); 
        setIsFilterApplied(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                yearRef.current && !yearRef.current.contains(event.target) &&
                categoryRef.current && !categoryRef.current.contains(event.target)
            ) {
                setYearOpen(false);
                setCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isYearOpen && !isCategoryOpen && isFilterApplied) {
            handleApplyFilters();
        }
    }, [isYearOpen, isCategoryOpen, isFilterApplied]);

    useEffect(() => {
        if (isFilterApplied) {
            handleApplyFilters();
        }
    }, [selectedYear, selectedCategory]);

    return (
        <div className="overdue-filter-container">
            <div className="filter-img">
                <img src="/filter.png" alt="Filter Icon" />
            </div>
            <div className="filter-hint">
                <h4>Filter By</h4>
            </div>
            <div className="year-filter" ref={yearRef}>
                <button className={`filter-btn ${isYearOpen ? 'open' : ''}`} onClick={handleYearFilter}>
                    {selectedYear || 'Year'}
                </button>
                {isYearOpen && (
                    <div className="custom-dropdown-options">
                        <CustomYearPicker
                            selectedYear={selectedYear || new Date().getFullYear()} 
                            onChange={handleYearChange}
                        />
                    </div>
                )}
            </div>
            <div className="category-filter" ref={categoryRef}>
                <button className={`filter-btn ${isCategoryOpen ? 'open' : ''}`} onClick={handleCategoryFilter}>
                    {selectedCategory || 'Category'}
                </button>
                {isCategoryOpen && (
                    <div className="custom-dropdown-options">
                        <CustomCategoryPicker
                            selectedCategory={selectedCategory}
                            onChange={handleCategoryChange}
                        />
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

export default BooksFilter;
