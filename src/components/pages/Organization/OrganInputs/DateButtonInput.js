import React, { useEffect, useState } from 'react';
import { DatePicker } from 'zaman';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';
import GradientStyles from '../../../../styles/gradients/Gradient.module.css'

// assets
import CalenderIcon from '../../../../components/icons/CalenderIcon'

const DateButtonInput = ({ defaultValue, onChange, value, customShowDateFormat, position = 'right',placeH, icon }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    setSelectedDate(value || '');
    setFilled(!!value);
  }, [value]);

  const handleChange = (date) => {
    setSelectedDate(date);
    setFilled(true);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className='w-full flex'>
        <span className="absolute -mt-0 mr-2 w-5">
          {icon ? 
            icon
            :
            <CalenderIcon />
          }
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