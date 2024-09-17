import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Default styles

function CustomDatePicker({ startDate, onChange }) {
  const [open, setOpen] = useState(true); // Open the picker immediately

  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        open={open} // Control visibility
        onClickOutside={() => setOpen(false)} // Close picker on outside click
        onCalendarClose={() => setOpen(false)}
        onCalendarOpen={() => setOpen(true)}
        calendarClassName="custom-calendar" // Apply custom styling
      />
    </div>
  );
}

export default CustomDatePicker;
