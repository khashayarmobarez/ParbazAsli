import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PHONE_REGEX = /^09\d{9}$/;

const PhoneInput = ({ phoneRef, onChange, value, focus, onFocus, onBlur, isSubmitted }) => {
  const [validPhone, setValidPhone] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false)
  
  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [labelColor, setLabelColor] = useState('var(--text-input-default)');
  const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

  const ErrorConditionMet = (value && !validPhone && filled) || (!value && isSubmitted);

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

  const handleLabelClick = () => {
    document.getElementById('phoneNum').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validPhone, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validPhone, filled);
    onBlur();
  };

  const updateColors = (isFocused, isValid, isFilled) => {
    if (isFocused) {
      setIconColor('var(--text-input-selected)');
      setLabelColor('var(--text-input-selected)');
      setTextErrorColor('var(--text-input-selected)');
      setBorderColorClass(inputStyles.inputSelectedBorder);
      setLeftEmpty(false);
    } else if (isValid && isFilled) {
      setIconColor('var(--text-accent)');
      setLabelColor('var(--text-accent)');
      setTextErrorColor('var(--text-accent)');
      setBorderColorClass(inputStyles.inputValidBorder);
    } else if (!isValid && isFilled) {  // New condition for invalid input when filled
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setTextErrorColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else if (ErrorConditionMet || (!isFilled && isSubmitted)) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setTextErrorColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setTextErrorColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setLeftEmpty(true)
    }
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-3 top-3 w-5 z-10">
          <LocalPhoneRoundedIcon sx={{ color: iconColor }} />
        </span>
        <input
          type="text"
          id="phoneNum"
          autoComplete='tel'
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          aria-invalid={validPhone ? "false" : "true"}
          aria-describedby="phonenote"
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl
            border-2 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none
            ${borderColorClass}
            ${inputStyles.inputText2}
            ${ErrorConditionMet ? inputStyles.inputText2Error : inputStyles.inputText2}
          `}
          placeholder=" "
        />
        <label
          onClick={handleLabelClick}
          htmlFor="username"
          className={`
            absolute right-11 top-[13px]
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            text-[${labelColor}]
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          شماره تلفن
        </label>
      </div>
      <p id="phonenote" className={`${value && !validPhone && filled ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${textErrorColor}]`}>
       *شماره تلفن باید با 09 شروع شود و 11 رقمی باشد.
      </p>
      <p id="inputnote" aria-live="polite" className={`${((!value && isSubmitted ) || leftEmpty) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${textErrorColor }]`}>
        *شماره تلفن الزامی می باشد
      </p>
    </div>
  );
};

export default PhoneInput;