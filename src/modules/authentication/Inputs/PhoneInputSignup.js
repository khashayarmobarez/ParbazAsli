import React, { useState, useEffect } from 'react';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import inputStyles from '../../../styles/Inputs.module.css';
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import Cookies from 'js-cookie';

// regexes
import { PHONE_REGEX } from '../../../Utilities/Providers/regexProvider';

const PhoneInputSignup = ({ phoneRef, onChange, value, focus, onFocus, onBlur, isSubmitted }) => {

  // language
  const { t } = useTranslation();
  const dir = Cookies.get('dir') || 'ltr';

  const [validPhone, setValidPhone] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [labelColor, setLabelColor] = useState('var(--text-input-default)');
  const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

  const ErrorConditionMet = (value && !validPhone && filled) || (!value && isSubmitted);

  useEffect(() => {
    const result = PHONE_REGEX.test(value);
    setValidPhone(result);

    if (!value && isSubmitted) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setShowErrors(true);
    }
  }, [value, isSubmitted]);

  const handleInputChange = (event) => {
    const englishValue = persianToEnglishNumber(event.target.value);
    onChange({ ...event, target: { ...event.target, value: englishValue } });
    setFilled(englishValue.trim() !== '');
  };

  const handleLabelClick = () => {
    document.getElementById('phoneSignup').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validPhone, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validPhone, filled);
    setShowErrors(true);
    onBlur();
  };

  const updateColors = (isFocused, isValid, isFilled) => {
    if (isFocused) {
      setIconColor('var(--text-input-selected)');
      setLabelColor('var(--text-input-selected)');
      setTextErrorColor('var(--text-input-selected)');
      setBorderColorClass(inputStyles.inputSelectedBorder);
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
    }
  };

  const persianToEnglishNumber = (input) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return input.replace(/[\u06F0-\u06F9]/g, (char) => {
      return englishNumbers[persianNumbers.indexOf(char)];
    });
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl '>
      <div className='relative w-full min-h-12 cursor-text'>
        <span className={`absolute  ${dir === 'ltr' ? 'left-3' : 'right-3'} top-3 w-5 z-10 cursor-text`}>
          <LocalPhoneRoundedIcon sx={{ color: iconColor }} />
        </span>
        <input
          type="number"
          id="phoneSignup"
          ref={phoneRef}
          autoComplete="tel"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          aria-invalid={validPhone ? "false" : "true"}
          aria-describedby="phonenote"
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
          placeholder=" "
        />
        <label
          onClick={handleLabelClick}
          htmlFor="phoneSignup"
          className={`
            absolute top-[13px]
            ${dir === 'ltr' ? 'left-11' : 'right-11'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            cursor-text
            text-[${labelColor}]
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          {t("RegistrationPages.Signup.userPhoneNumber")}
        </label>
      </div>
      <p id="phonenote" className={`${filled && value && !validPhone ? "instructions" : "hidden"} mt-2 ${dir === 'ltr' ? 'text-left' : 'text-right'} text-xs mr-4 text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.userPhoneNumberError1")}
      </p>
      <p id="inputnote" aria-live="polite" className={`${(!value && showErrors) ? "instructions" : "hidden"} mt-2 ${dir === 'ltr' ? 'text-left' : 'text-right'} text-xs mr-4 text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.userPhoneNumberError2")}
      </p>
    </div>
  );
};

export default PhoneInputSignup;