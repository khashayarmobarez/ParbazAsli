import React, { useState } from 'react';
import { DatePicker } from 'zaman';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';
import GradientStyles from '../../../../styles/gradients/Gradient.module.css'

// assets
import Calender from '../../../../assets/icons/calender-Icon.svg'

const DateButtonInput = ({ defaultValue, onChange, customShowDateFormat, position = 'right',placeH, icon }) => {

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
        <span className='z-0' > 
            <img src={icon ? icon : Calender} alt='icon' className=' absolute mt-3 mr-6 w-6' />
        </span>
        <DatePicker
            onChange={(e) => handleChange(e.value)}
            show={true}
            inputClass={`${GradientStyles.container2} ${filled && inputStyles.inputFilledBorder} w-full h-12 rounded-3xl pr-14`}
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

export default DateButtonInput;