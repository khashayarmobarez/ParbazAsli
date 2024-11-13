import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PHONE_REGEX = /^09\d{9}$/;

const PhoneInput = ({ phoneRef, onChange, value, focus, onFocus, onBlur }) => {
  const [validPhone, setValidPhone] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const result = PHONE_REGEX.test(value);
    setValidPhone(result);
  }, [value]);

  const persianToEnglishNumber = (input) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return input.replace(/[\u06F0-\u06F9]/g, (char) => {
      return englishNumbers[persianNumbers.indexOf(char)];
    });
  };

  const handleInputChange = (event) => {
    let newValue = persianToEnglishNumber(event.target.value);
    onChange({ ...event, target: { ...event.target, value: newValue } });
    setFilled(newValue.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='flex w-full h-12'>
        <span>
          <LocalPhoneRoundedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        </span>
        <input
          type="text"
          id="phone"
          ref={phoneRef}
          autoComplete='tel'
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validPhone ? "false" : "true"}
          aria-describedby="phonenote"
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="شماره موبایل"
        />
      </div>
      <p id="phonenote" className={`${value && !validPhone && filled ? "instructions" : "hidden"} self-start text-start`}
      style={{color:'var(--text-error)'}}>
        <InfoOutlinedIcon /> شماره تلفن باید با 09 شروع شود و 11 رقمی باشد.
      </p>
    </div>
  );
};

export default PhoneInput;