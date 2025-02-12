import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// css styles 
import inputStyles from '../../styles/Inputs.module.css'

const LongTextInput = ({ value, onChange, placeholder, Type, icon }) => {

  const [filled, setFilled] = useState(false);
  

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    onChange(event); // Call the onChange function passed from the parent component
    setFilled(event.target.value.trim() !== ''); // Check if the input is filled
  };

  return (
    <div className='flex relative w-[100%] min-h-32 rounded-2xl'>
      <textarea type={Type} id="aircraft" placeholder={placeholder} onChange={handleInputChange} value={value} className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-4 pt-4 text-right align-top md:min-h-36`} />
    </div>
  ); 
};

export default LongTextInput;

// icon is optional
//  <TextInput icon{?} value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />