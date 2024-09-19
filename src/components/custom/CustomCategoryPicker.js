import React from 'react';

// Example categories
const categories = ['Children', 'Fantasy', 'Biography', 'History', 'Mystery', 'Romance'];

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
