import React from 'react';

// Example categories
const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'];

function CustomCategoryPicker({ selectedCategory, onChange }) {
  return (
    <div className="custom-category-picker">
      <ul>
        {categories.map(category => (
          <li
            key={category}
            className={selectedCategory === category ? 'selected' : ''}
            onClick={() => onChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomCategoryPicker;
