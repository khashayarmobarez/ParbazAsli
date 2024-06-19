import React, { useState } from 'react';
import { DatePicker } from 'zaman';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

// assets
import Calender from '../../../../assets/icons/calender-Icon.svg'

const DateLastRepackInput = ({ defaultValue, onChange, customShowDateFormat, position = 'right',placeH }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filled, setFilled] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
    setFilled(true);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className='w-full flex'>
        <span> 
            <img src={Calender} alt='icon' className=' absolute mt-3.5 mr-2 w-5' />
        </span>
        <DatePicker
            onChange={(e) => handleChange(e.value)}
            show={true}
            inputClass={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} ${inputStyles.customDateInput}`}
            position={position}
            round="thin"
            accentColor="#0D59F2"
            locale="fa"
            inputAttributes={{ placeholder: placeH }}
            direction="rtl"
        />
    </div>
  );
};

export default DateLastRepackInput;