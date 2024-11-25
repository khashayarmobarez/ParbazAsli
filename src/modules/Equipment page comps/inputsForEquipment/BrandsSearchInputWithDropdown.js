import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../../components/icons/ThreeDCube';
import inputStyles from '../../../styles/Inputs/Inputs.module.css';

const BrandsSearchInputWithDropdown = ({ options, selectedOption, handleSelectChange, name, icon, ClickedOthers, showCustomBrandInput, setShowCustomBrandInput, IsEmptyAfterSubmit }) => {
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
    setShowCustomBrandInput(false);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(!isOpen);
    }
  };

  const handleClickOthers = () => {
    setShowCustomBrandInput(true);
    setSearchTerm('سایر ...');
    setIsOpen(false);
  }

  return (
    <div className="flex relative w-[100%] h-12 rounded-xl" ref={dropdownRef}>
      <span className="absolute mt-3 mr-2 w-6">
        {icon ? icon : <Cube />}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={`${inputStyles.inputDropdown} ${filled ? inputStyles.inputFilledBorder : ''} ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder} placeholder-transparent w-full pl-10 pr-8`}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      <label
        htmlFor="floatingInput"
        onClick={() => setIsOpen(true)}
        className={`
          absolute right-9 top-[14px] text-textInputDefault
          transition-all duration-300 transform
          ${filled ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-sm'}
          ${inputRef.current && inputRef.current === document.activeElement ? 'text-textAccent' : ''}
        `}
      >
        {name || 'Search options'}
      </label>
      <span 
        onClick={handleIconClick} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
      >
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
      </span>
      {isOpen && (
        <ul className="absolute z-30 w-full bg-bgOutputSelectedOption mt-14 rounded-xl max-h-60 overflow-auto"
        style={{boxShadow:'var(--shadow-button-dark)'}}>
          {filteredOptions.map((option) => (
            <div key={option.id} className='flex flex-col w-full items-center justify-center'>
              <li
                className="px-4 w-full py-2 bg-bgOutputSelectedOption hover:bg-bgInputDropdown cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
              <div className='w-full h-[1px] bg-textDisabled' />
            </div>
          ))}
          <div className='flex flex-col w-full items-center justify-center'>
            <li
              className="px-4 w-full py-2 hover:bg-[var(--corn-flower-blue)] cursor-pointer"
              onClick={handleClickOthers}
            >
              سایر ...
            </li> 
            <div className='w-full h-[1px] bg-textDisabled' />
          </div>
        </ul>
      )}
    </div>
  );
};

export default BrandsSearchInputWithDropdown;
