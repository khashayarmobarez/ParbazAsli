import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import inputStyles from '../../../styles/Inputs/Inputs.module.css';

// regexes
import { EMAIL_REGEX } from '../../../Utilities/Providers/regexProvider';

const EmailInputSignup = ({ emailRef, onChange, value, focus, onFocus, onBlur, autoComplete, isSubmitted }) => {

  const [validEmail, setValidEmail] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false)

  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');

  const ErrorConditionMet = (value && !validEmail && filled) || (!value && isSubmitted);

  useEffect(() => {
    const result = EMAIL_REGEX.test(value);
    setValidEmail(result);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  const handleLabelClick = () => {
    document.getElementById('phone').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validEmail, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validEmail, filled);
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
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-3 top-3 w-5 z-10">
          <EmailOutlinedIcon sx={{ color: (!value && isSubmitted) ? 'var(--text-error)' : iconColor }} />
        </span>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete='email'
          value={value}
          onChange={handleInputChange}
          required
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
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
            ${(!value && isSubmitted) ? 'text-textError' : 'text-textInputDefault'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          ایمیل
        </label>
      </div>
      <p id="emailnote" className={`${value && !validEmail && filled ? "instructions" : "hidden"} mt-2 text-right text-xs mr-1 text-textError`}>
        لطفا یک آدرس ایمیل معتبر وارد کنید.
      </p>
      <p id="inputnote" aria-live="polite" className={`${((!value && isSubmitted ) || leftEmpty) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-1 text-textError`}>
        *ایمیل الزامی می باشد
      </p>
    </div>
  );
};

export default EmailInputSignup;