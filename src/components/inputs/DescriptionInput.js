import React, { useState } from 'react';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css'

const DescriptionInput = ({ value, onChange, placeholder,  }) => {

  const [filled, setFilled] = useState(false);
  

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    onChange(event); // Call the onChange function passed from the parent component
    setFilled(event.target.value.trim() !== ''); // Check if the input is filled
  };

  return (
    <div className='flex relative w-[100%] min-h-12 rounded-2xl'>
      <textarea id="aircraft" placeholder={placeholder} onChange={handleInputChange} value={value ? value : ''} className={`${inputStyles.inputDescription} ${filled && inputStyles.inputFilledBorder} rounded-xl w-[100%] min-h-28 px-3 py-3 text-sm`} />
    </div>
  ); 
  
};

export default DescriptionInput;

// icon is optional
//  <TextInput icon{?} value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />