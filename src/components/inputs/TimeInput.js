import React, { useState } from 'react';
import { TimePicker } from "zaman";

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const TimeInput = ({ value, onChange, placeholder }) => {
  const [filled, setFilled] = useState(false);

  // Function to handle changes in the input value
  const handleInputChange = (time) => {
    onChange(time); // Call the onChange function passed from the parent component
    setFilled(time !== ''); // Check if the input is filled
  };
  
  return (
    <div className={`w-full flex h-12`}>
      <TimePicker
        onChange={handleInputChange}
        show={true}
        inputClass={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} justify-center text-center w-full`}
        position='left'
        round="thin"
        accentColor="#0D59F2"
        locale="fa"
        inputAttributes={{ placeholder: placeholder }}
        value={value}
        format="HH:mm" // Correct format for 24-hour time
        clockType="24h" // Explicitly set 24-hour clock
        minuteStep={1} // Allow selection of every minute
      />
    </div>
  );
};

export default TimeInput;