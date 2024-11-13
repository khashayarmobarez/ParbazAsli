import React, { useState, useEffect } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const USER_REGEX = /^[\u0600-\u06FF\s]+$/;

const UserNameInputSignup = ({ userRef, onChange, value, focus, onFocus, onBlur, isSubmitted }) => {

  const [validName, setValidName] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false)

  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');

  const ErrorConditionMet = (value && !validName && filled) || (!value && isSubmitted);

  useEffect(() => {
    const result = USER_REGEX.test(value);
    setValidName(result);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  const handleLabelClick = () => {
    document.getElementById('username').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validName, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validName, filled);
    onBlur();
  };

  const updateColors = (isFocused, isValid, isFilled) => {
    if (isFocused) {
      setIconColor('var(--text-input-selected)');
      setBorderColorClass(inputStyles.inputSelectedBorder);
      setLeftEmpty(false);
    } else if (isValid && isFilled) {
      setIconColor('var(--text-accent)');
      setBorderColorClass(inputStyles.inputValidBorder);
    } else if (!isValid && isFilled) {  // New condition for invalid input when filled
      setIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else if (ErrorConditionMet || (!isFilled && isSubmitted)) {
      setIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else {
      setIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setLeftEmpty(true)
    }
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-3 top-3 w-5 z-10">
          <PersonOutlineOutlinedIcon sx={{ color: iconColor }} />
        </span>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="name"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
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
            text-[var(--text-input-default)]
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          نام
        </label>
      </div>
      <p id="uidnote" aria-live="polite" className={`${value && !validName && filled ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-textError`}>
        *3 تا 24 کاراکتر<br />
        *با حروف فارسی بنویسید
      </p>
      <p id="inputnote" aria-live="polite" className={`${((!value && isSubmitted ) || leftEmpty) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-textError`}>
        *نام الزامی می باشد
      </p>
    </div>
  );
};

export default UserNameInputSignup;