import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../components/icons/ThreeDCube';
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const SearchInputWithDropdown = ({ options, selectedOption, handleSelectChange, name, icon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsFilled(value !== '');
    filterOptions(value);
    setIsOpen(true);
  };

  const filterOptions = (value) => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    handleSelectChange(option);
    setSearchTerm(option.name);
    setIsFilled(true);
    setIsOpen(false);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(!isOpen);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-full min-h-12" ref={dropdownRef}>
      <span className="absolute right-3 top-3 w-5 z-10">
        {icon ? icon : <Cube />}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={`
          peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl appearance-none
          border-2 border-gray-300 bg-transparent
          text-gray-900 placeholder-transparent
          focus:outline-none focus:ring-0 focus:border-blue-600
          ${isFilled && inputStyles.inputFilledBorder}
          ${inputStyles.inputDropdown}
        `}
        placeholder=" "
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor="searchInput"
        className={`
          absolute right-10 top-[14px] text-textInputDefault
          transition-all duration-300 transform
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:text-sm
          peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
          ${(isFocused || isFilled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-sm'}
          ${isFocused ? 'text-blue-600' : ''}
        `}
      >
        {name || 'جستجو کنید'}
      </label>
      <span 
        onClick={handleIconClick} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
      >
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
      </span>
      {isOpen && (
        <ul className="absolute z-30 w-full bg-bgInputDropdown mt-1 rounded-xl shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div key={option.id} className='flex flex-col w-full items-center justify-center text-sm'>
              <li
                className="px-4 w-full py-2 hover:bg-bgInputDropdown cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
              <div className='w-full h-[1px] bg-textDisabled' />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInputWithDropdown;