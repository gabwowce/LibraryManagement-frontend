import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

function CustomDatePicker({ startDate, onChange, onClick }) {
  const [open, setOpen] = useState(true); 
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (date) => {
    onChange(date); 
    if (onClick) onClick(); 
  };

  return (
    <div className="custom-date-picker" ref={datePickerRef}>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        open={open} 
        onCalendarClose={() => {
          setOpen(false);
          if (onClick) onClick(); 
        }}
        onCalendarOpen={() => setOpen(true)}
        calendarClassName="custom-calendar"
      />
    </div>
  );
}

export default CustomDatePicker;
