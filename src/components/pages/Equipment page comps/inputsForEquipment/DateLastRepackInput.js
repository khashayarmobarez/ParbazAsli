import React, { useState } from 'react';
import { DatePicker } from 'zaman';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

// assets
import CalenderIcon from '../../../../components/icons/CalenderIcon'

const DateLastRepackInput = ({ defaultValue, onChange, customShowDateFormat, position = 'right',placeH, icon, IsEmptyAfterSubmit }) => {

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
        <span className="absolute mt-3 mr-2 w-5">
          {icon ? 
            icon
            :
            <CalenderIcon />
          }
        </span>
        <DatePicker
            onChange={(e) => handleChange(e.value)}
            show={true}
            inputClass={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder} ${inputStyles.customDateInput} `}
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