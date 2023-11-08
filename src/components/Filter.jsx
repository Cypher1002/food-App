import React from 'react';

const Filter = ({ availableMeals, handleCategoryChange }) => {
  const uniqueCategories = [...new Set(availableMeals.map(meal => meal.category))];

  return (
    <div className="filter-container">
      {uniqueCategories.map(category => (
        <button key={category} onClick={() => handleCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;