import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const NumberInput = ({ value, onChange, placeholder, icon, IsEmptyAfterSubmit }) => {
  const [filled, setFilled] = useState(false);

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) { // Allow only numbers
      onChange(event); // Call the onChange function passed from the parent component
      setFilled(newValue.trim() !== ''); // Check if the input is filled
    }
  };

  return (
    <div className='flex relative w-[100%] min-h-12 rounded-2xl'>
      <span>
        {icon ?
          <img src={icon} alt='icon' className='absolute w-6 mt-[12px] mr-[8px]' style={{ fill: 'white' }} />
          :
          <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        }
      </span>
      <input
        type="number"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value ? value : ''}
        className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder} w-[100%] pr-9`}
      />
    </div>
  );
};

export default NumberInput;