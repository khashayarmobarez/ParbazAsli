import React, { useState, useRef } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../../../components/icons/ThreeDCube';

// css styles 
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const DropdownInputForEquipment = ({ options, selectedOption, handleSelectChange, name, icon, IsEmptyAfterSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const selectRef = useRef(null);

  const handleInputChange = (event) => {
    setIsFilled(event.target.value !== '');
  };

  const handleChange = (event) => {
    handleInputChange(event);
    const selected = options.find(option => option.id === parseInt(event.target.value));
    handleSelectChange(selected);
  };

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.click();
      selectRef.current.focus();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <div className="relative w-full min-h-12">
      <span className="absolute right-3 top-3 w-5 z-10">
        {icon ? icon : <Cube />}
      </span>
      <select
        ref={selectRef}
        className={`
          peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl appearance-none
          border-2 border-gray-300 bg-transparent
          text-gray-900 placeholder-transparent
          focus:outline-none focus:ring-0 focus:border-blue-600
          ${isFilled && inputStyles.inputFilledBorder}
          ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder}
          ${!selectedOption && 'text-textDisabled'}
          ${inputStyles.inputDropdown}
        `}
        value={selectedOption ? selectedOption.id : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value="" disabled></option>
        {options?.map((option) => (
          <option key={option.id} value={option.id} className='text-textDefault'>
            {option.brand} - {option.model}
          </option>
        ))}
      </select>
      <label
        onClick={handleLabelClick}
        className={`
          absolute right-10 top-[14px] text-textInputDefault
          transition-all duration-300 transform
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:text-xs
          peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
          ${(isFocused || isFilled || selectedOption) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-sm'}
          ${isFocused ? 'text-blue-600' : ''}
          cursor-pointer
        `}
      >
        {name || 'انتخاب تجهیزات'}
      </label>
      <span onClick={handleIconClick} className="absolute left-3 top-0 h-full flex items-center pr-2 cursor-pointer">
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
      </span>
    </div>
  );
};

export default DropdownInputForEquipment;