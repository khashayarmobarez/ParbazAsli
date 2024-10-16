import React, { useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import { DatePicker } from "zaman";

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const TextInput = ({ value, onChange, placeholder, IsEmptyAfterSubmit }) => {

  const [filled, setFilled] = useState(false);

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    onChange(event); // Call the onChange function passed from the parent component
    setFilled(event.target.value.trim() !== ''); // Check if the input is filled
  };
  
  return (
    <div className={`w-full flex h-12 `}> 
      <span> 
        {/* <CalendarTodayOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} /> */}
      </span>
      <DatePicker
          onChange={handleInputChange}
          show={true}
          inputClass={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} ${inputStyles.customDateInput} ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder}`}
          position='right'
          round="thin"
          accentColor="#23BC7C"
          locale="fa"
          inputAttributes={{ placeholder: placeholder }}
          direction="rtl"
          value={value}
      />
    </div>
  );
};

export default TextInput;
