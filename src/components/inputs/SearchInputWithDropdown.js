import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg';
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const SearchInputWithDropdown = ({ options, selectedOption, handleSelectChange, name, icon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [filled, setFilled] = useState(false);
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
    setFilled(value !== '');
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
    setFilled(true);
    setIsOpen(false);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(true);
    }
  };

  return (
    <div className="flex relative w-[100%] h-12 rounded-xl" ref={dropdownRef}>
      <span>
        <img src={icon || Cube} alt="icon" className="absolute mt-3 mr-3 w-5" />
      </span>
      <input
        ref={inputRef}
        type="text"
        className={`${inputStyles.inputDropdown} ${filled ? inputStyles.inputFilledBorder : ''} placeholder-text-color w-full pl-10 pr-8`}
        placeholder={name}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      <span 
        onClick={handleIconClick} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
      </span>
      {isOpen && (
        <ul className="absolute z-20 w-full bg-[var(--dark-blue-bg)] mt-12 rounded-xl shadow-lg max-h-60 overflow-auto" >
          
          {filteredOptions.map((option) => (
            <div className='flex flex-col w-full items-center justify-center '>
              <li
                key={option.id}
                className="px-4 py-2 hover:bg-[var(--corn-flower-blue)] cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
              <div className='w-full h-[1px] bg-[var(--low-opacity-white)]' />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInputWithDropdown;

// Usage
{/* <SearchInputWithDropdown
    options={courseTypeOptionData}
    selectedOption={selectedClassType}
    handleSelectChange={handleSelectClassType}
    name="Search options"
    icon={Cube}
/> */}