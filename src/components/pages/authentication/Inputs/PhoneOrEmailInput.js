import React, { useState, useEffect } from 'react';

// mui
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PhoneOrEmailInput = ({ onChange, value, focus, onFocus, onBlur }) => {

  const [inputFocus, setInputFocus] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const isValidPhone = PHONE_REGEX.test(value);
    const isValidEmail = EMAIL_REGEX.test(value);
    setValidInput(isValidPhone || isValidEmail);
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
          {!EMAIL_REGEX.test(value) ? (
            <LocalPhoneRoundedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          ) : (
            <EmailRoundedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          )}
        </span>
        <input
          type="text"
          id="phoneOrEmail"
          autoComplete='on'
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validInput ? "false" : "true"}
          aria-describedby="inputnote"
          onFocus={() => {
            setInputFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setInputFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="ایمیل یا شماره موبایل"
        />
      </div>
      <p id="inputnote" className={`${value && !validInput && filled ? "instructions" : "hidden"} mt-2 text-right`}
      style={{color:'var(--notification-red)'}}>
        <InfoOutlinedIcon sx={{marginLeft:'5px'}} /> لطفاً یک شماره موبایل معتبر (شروع با 09 و 11 رقمی) یا یک ایمیل معتبر وارد کنید.
      </p>
    </div>
  );
};

export default PhoneOrEmailInput;