import React, { useState } from 'react';
import { DatePicker } from 'zaman';

// styles
import inputStyles from '../../styles/Inputs/Inputs.module.css';

// assets
import CalenderIcon from '../icons/CalenderIcon'

const DateInput = ({ defaultValue, onChange, customShowDateFormat, position = 'right',placeH, icon, IsEmptyAfterSubmit, isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2 }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [filled, setFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
    setFilled(true);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <>
      <div className='w-full flex relative'>
          <span className="absolute mt-3 mr-2 w-5">
            {icon ? 
              icon
              :
              <CalenderIcon customColor={(!selectedDate || ErrorCondition2 || ErrorCondition) && isSubmitted && 'var(--text-error)'} />
            }
          </span>
          <DatePicker
              onChange={(e) => handleChange(e.value)}
              show={true}
              inputClass={`${inputStyles.inputText2} 
              ${filled && inputStyles.inputFilledBorder} 
              ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder} 
              ${inputStyles.customDateInput} `}
              position={position}
              round="thin"
              accentColor="#23bc7c"
              locale="fa"
              inputAttributes={{ placeholder: placeH }}
              direction="rtl"
          />
          {
            filled &&
            <label
              htmlFor="floatingDropdown"
              className={`
                absolute right-10 top-[14px]
                -translate-y-[21px] translate-x-2 text-xs bg-bgPageMain px-2
              `}
            >
            {placeH || 'تاریخ'}
          </label>
          }
      </div>
      {
        (selectedDate || isSubmitted) && (ErrorCondition || ErrorCondition2) &&
        <div id='errors' className='w-full flex flex-col items-start -mt-4'>
          {ErrorCondition && <span className='text-textError text-xs -mt-1'>{ErrorText}</span>}
          {ErrorCondition2 && <span className='text-textError text-xs -mt-1'>{ErrorText2}</span>}
        </div>
      }
    </>
  );
};

export default DateInput;