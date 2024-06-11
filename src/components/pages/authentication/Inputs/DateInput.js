import React, { useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'; // Make sure to import the icon
import { DatePicker } from "zaman";
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const DateInput = ({ onChange, inputAttributes }) => {
  const [filled, setFilled] = useState(false);

  // Function to handle changes in the DatePicker value
  const handleInputChange = (value) => {
    onChange(value); // Call the onChange function passed from the parent component
    setFilled(value ? true : false); // Check if the input is filled
  };

  return (
    <div className={` w-full h-12`}>
      <span> 
        <CalendarTodayOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
      </span>
      {/* the date picker styles comes from signUp.module.css , it is a bug, if you want to make changes to the code i recommend removing this code */}
      <DatePicker onChange={handleInputChange} inputAttributes={inputAttributes} />
    </div>
  );
};

export default DateInput;