import React, { useState, useEffect } from 'react';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg';

const DropdownInput = ({ options, selectedOption, handleSelectChange, name, icon }) => {
  const [filled, setFilled] = useState(false);

  const handleInputChange = (event) => {
    setFilled(event.target.value !== '');
  };

  const handleChange = (event) => {
    handleInputChange(event);
    const selectedValue = event.target.value;

    // Determine if the ID should be a number or a string
    const sampleOption = options[0];
    const parsedValue = typeof sampleOption.id === 'number' ? parseInt(selectedValue) : selectedValue;

    const selected = options.find(option => option.id === parsedValue);
    handleSelectChange(selected);
  };

  return (
    <div className="flex relative w-[100%] h-12 rounded-xl">
      <span>
        <img src={icon || Cube} alt="icon" className="absolute mt-3 mr-2 w-5" />
      </span>
      <select
        className={`${inputStyles.inputDropdown} ${filled ? inputStyles.inputFilledBorder : ''} w-[100%]`}
        id="dropdown"
        value={selectedOption ? selectedOption.id : ''}
        onChange={handleChange}
      >
        <option value="" disabled>{name}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <span>
        <ArrowBackIosNewIcon sx={{ position: 'absolute', transform: 'rotate(-90deg)', margin: '0.8rem -2rem 0 0rem' }} />
      </span>
    </div>
  );
};

export default DropdownInput;
