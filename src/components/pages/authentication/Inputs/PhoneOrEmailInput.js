import React, { useState, useEffect } from 'react';

// mui
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// styles
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PhoneOrEmailInput = ({ onChange, value, focus, onFocus, onBlur, isSubmitted }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [filled, setFilled] = useState(false);
  const [color, setColor] = useState('var(--text-input-default)');
  const [leftEmpty, setLeftEmpty] = useState(false);

  const ErrorConditionMet = (value && !validInput && filled ) || (!value &&  isSubmitted);

  useEffect(() => {
    const isValidPhone = PHONE_REGEX.test(value);
    const isValidEmail = EMAIL_REGEX.test(value);
    setValidInput(isValidPhone || isValidEmail);
    setFilled(value.trim() !== '');
  }, [value]);

  // const triggerAfterDelay = (callback) => {
  //   setIsTyping(true);
    
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }
    
  //   const timeout = setTimeout(() => {
  //     setIsTyping(false);
  //     callback();
  //   }, 1500);
    
  //   setTypingTimeout(timeout);
  // };

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
  
    // triggerAfterDelay(() => {
    //   if (newValue.trim() === '' && inputFocus === false) {
    //     setLeftEmpty(true);
    //   } else {
    //     setLeftEmpty(false);
    //   }
    // });
  };

  const handleFocus = () => {
    setColor('var(--text-input-selected)');
    setInputFocus(true);
    setLeftEmpty(false)
    onFocus();
  };

  const handleBlur = () => {

    if(validInput) {
      setColor('var(--text-accent)');
    } else if (!filled) {
      setColor('var(--text-input-default)');
    } else {
      setColor('var(--text-input-default)');
      console.log('on blur 2');
    }

    setInputFocus(false);
    onBlur();
  };

  const handleLabelClick = () => {
    document.getElementById('phoneOrEmail').focus();
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-2 top-3 w-5 z-10">
          {!EMAIL_REGEX.test(value) && !PHONE_REGEX.test(value) && (
            <PersonOutlineOutlinedIcon sx={{ color: ErrorConditionMet ? color : 'var(--text-default)' }} />
          )}
          {EMAIL_REGEX.test(value) && (
            <EmailRoundedIcon sx={{ color: color }} />
          )}
          {PHONE_REGEX.test(value) && (
            <LocalPhoneRoundedIcon sx={{ color: color }} />
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl
            border-2 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none
            ${filled && validInput && inputStyles.inputFilledBorder}
            ${inputStyles.inputText2}
            ${ErrorConditionMet ? `${inputStyles.inputText2Error}` : `${inputStyles.inputText2}`}
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
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
            ${(value && !validInput && filled && !inputFocus) ? 'text-textError' : validInput ? 'text-textAccent' : 'text-textInputDefault'} 
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-base'}
            ${inputFocus ? 'text-blue-600' : ''}
          `}
        >
          ایمیل یا شماره موبایل
        </label>
      </div>
      <p id="inputnote" className={`${(value && !validInput && filled ) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${color}]`}>
        *نام کاربری معتبر نمی باشد
      </p>
      <p id="inputnote" className={`${!value && ( isSubmitted) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-[${color}]`}>
        *نام کاربری الزامی می باشد
      </p>
    </div>
  );
};

export default PhoneOrEmailInput;