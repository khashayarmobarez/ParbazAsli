import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import inputStyles from '../../../styles/Inputs.module.css';

// regexes
import { EMAIL_REGEX } from '../../../Utilities/Providers/regexProvider';
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const EmailInputSignup = ({ emailRef, onChange, value, focus, onFocus, onBlur, autoComplete, isSubmitted }) => {

  // language
  const { t } = useTranslation();
  const dir = Cookies.get('dir') || 'ltr';

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
        <span className={`absolute ${dir === 'ltr' ? 'left-3' : 'right-3'} top-3 w-5 z-10 cursor-text`}>
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
            peer w-full min-h-12 px-4 pt-1 pb-1 rounded-2xl
            ${dir === 'ltr' ? 'pl-10' : 'pr-10'}
            border-2 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none
            ${borderColorClass}
            ${inputStyles.inputText2}
            ${ErrorConditionMet ? inputStyles.inputText2Error : inputStyles.inputText2}
          `}
          placeholder=""
        />
        <label
          onClick={handleLabelClick}
          htmlFor="username"
          className={`
            absolute top-[13px]
            ${dir === 'ltr' ? 'left-11' : 'right-11'}
            ${(!value && isSubmitted) ? 'text-textError' : 'text-textInputDefault'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          {t("RegistrationPages.addEmail.emailInput.label")}
        </label>
      </div>
      <p id="emailnote" className={`${value && !validEmail && filled ? "instructions" : "hidden"} ${dir === 'ltr' ? 'text-left' : 'text-right'} mt-2 text-xs mr-1 text-textError`}>
      {t("RegistrationPages.addEmail.emailInput.invalidEmail")}
      </p>
      <p id="inputnote" aria-live="polite" className={`${((!value && isSubmitted ) || leftEmpty) ? "instructions" : "hidden"} ${dir === 'ltr' ? 'text-left' : 'text-right'} mt-2 text-xs mr-1 text-textError`}>
      {t("RegistrationPages.addEmail.emailInput.emailRequired")}
      </p>
    </div>
  );
};

export default EmailInputSignup;