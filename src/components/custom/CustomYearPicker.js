import React from 'react';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 21 }, (_, i) => currentYear - i);

function CustomYearPicker({ selectedYear, onChange }) {
  return (
    <div className="custom-year-picker">
      <ul>
        {years.map(year => (
          <li
            key={year}
            className={selectedYear === year ? 'selected' : ''}
            onClick={() => onChange(year)}
          >
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomYearPicker;
