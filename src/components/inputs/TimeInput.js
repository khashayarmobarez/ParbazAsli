import React, { useState } from 'react';
import { TimePicker } from "zaman";

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const TimeInput = ({ value, onChange, placeholder }) => {
  const [filled, setFilled] = useState(false);

  // Function to handle changes in the input value
  const handleInputChange = (timeObject) => {
    if (timeObject && timeObject.hour !== undefined && timeObject.minute !== undefined) {
      const formattedTime = `${timeObject.hour.toString().padStart(2, '0')}:${timeObject.minute.toString().padStart(2, '0')}`;
      onChange(formattedTime);
      setFilled(true);
    } else {
      onChange('');
      setFilled(false);
    }
  };

  // Function to parse the value for the TimePicker
  const parseValueForTimePicker = (timeString) => {
    if (timeString) {
      const [hour, minute] = timeString.split(':');
      return { hour: parseInt(hour, 10), minute: parseInt(minute, 10) };
    }
    return undefined;
  };

  return (
    <div className={`w-full flex h-12`}>
      <TimePicker
        onChange={handleInputChange}
        show={true}
        inputClass={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} justify-center text-center w-full`}
        position='right'
        round="thin"
        accentColor="#0D59F2"
        locale="fa"
        inputAttributes={{ placeholder: placeholder }}
        value={parseValueForTimePicker(value)}
        clockType="24h"
      />
    </div>
  );
};

export default TimeInput;