import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <input 
      type="text" 
      placeholder="Search products..." 
      onChange={(e) => setInputValue(e.target.value)} 
    />
  );
};

export default SearchBar;
