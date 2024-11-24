import React, { useState, useEffect } from 'react';

// mui
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

// regexes
import { EMAIL_REGEX, PHONE_REGEX } from '../../../../Utilities/Providers/regexProvider';

const PhoneOrEmailInput = ({ onChange, value, focus, onFocus, onBlur, isSubmitted }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [filled, setFilled] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  
  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [labelColor, setLabelColor] = useState('var(--text-input-default)');
  const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

  const ErrorConditionMet = (value && !validInput && filled) || (!value && isSubmitted);

  useEffect(() => {
    const isValidPhone = PHONE_REGEX.test(value);
    const isValidEmail = EMAIL_REGEX.test(value);
    setValidInput(isValidPhone || isValidEmail);
    setFilled(value.trim() !== '');

    if(!value && isSubmitted) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setShowErrors(true);
    }

    if(value && validInput && !inputFocus) {
      setIconColor('var(--text-accent)');
      setLabelColor('var(--text-accent)');
      setTextErrorColor('var(--text-accent)');
      setBorderColorClass(inputStyles.inputValidBorder);  
    }
    
  }, [value, validInput, isSubmitted]);

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

  const updateColors = (isFocused, isValid, isFilled) => {
    if (isFocused) {
      setIconColor('var(--text-input-selected)');
      setLabelColor('var(--text-input-selected)');
      setBorderColorClass(inputStyles.inputSelectedBorder);
      setTextErrorColor('var(--text-input-selected)');
    } else if (isValid && isFilled) {
      setIconColor('var(--text-accent)');
      setLabelColor('var(--text-accent)');
      setTextErrorColor('var(--text-accent)');
      setBorderColorClass(inputStyles.inputValidBorder);
    } else if (ErrorConditionMet || (!isFilled && isSubmitted)) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setTextErrorColor('var(--text-error)'); 
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else {
      setIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setLabelColor('var(--text-error)');
      setTextErrorColor('var(--text-error)');
    }
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validInput, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validInput, filled);
    setShowErrors(true);
    onBlur();
  };

  const handleLabelClick = () => {
    document.getElementById('phoneOrEmail').focus();
  };

  const getIcon = () => {
    if (EMAIL_REGEX.test(value)) {
      return <EmailRoundedIcon sx={{ color: iconColor }} />;
    }
    if (PHONE_REGEX.test(value)) {
      return <LocalPhoneRoundedIcon sx={{ color: iconColor }} />;
    }
    return <PersonOutlineOutlinedIcon sx={{ color: iconColor }} />;
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-2 top-3 w-5 z-10 cursor-text">
          {getIcon()}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
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
          htmlFor="phoneOrEmail"
          className={`
            absolute right-9 top-[13px]
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            cursor-text
            text-[${labelColor}]
            ${(inputFocus || filled || value) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          ایمیل یا شماره موبایل
        </label>
      </div>
      <p id="inputnote" aria-live="polite" className={`${(!validInput && value && showErrors) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${textErrorColor}]`}>
        *نام کاربری معتبر نمی باشد
      </p>
      <p id="inputnote" aria-live="polite" className={`${(!value && showErrors) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${textErrorColor}]`}>
        *نام کاربری الزامی می باشد
      </p>
    </div>
  );
};

export default PhoneOrEmailInput;