import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import KeyIcon from '../../../components/icons/KeyIcon';
import inputStyles from '../../../styles/Inputs.module.css';

import Cookies from 'js-cookie';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const ConfirmPassInputSignup = ({ password, onChange, value, focus, onFocus, onBlur, isSubmitted, customActivePlaceHolderBgColor, customPlaceHolderText }) => {

  // language
  const { t } = useTranslation();
  const dir = Cookies.get('dir') || 'ltr';

  const [validMatch, setValidMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  
  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [labelColor, setLabelColor] = useState('var(--text-input-default)');
  const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

  const ErrorConditionMet = (value && !validMatch && filled) || (!value && isSubmitted);

  useEffect(() => {
    setValidMatch(value === password);

    if(!value && isSubmitted) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setShowErrors(true);
    }

  }, [value, password, isSubmitted]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLabelClick = () => {
    document.getElementById('confirm_pwd').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validMatch, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validMatch, filled);
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

  return (
    <>
      <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12`} htmlFor='confirm_pwd'>
        <span className={`absolute  ${dir === 'ltr' ? 'left-3' : 'right-3'} top-3 w-5 z-10 cursor-text`}  >
          <KeyIcon customColor={iconColor} />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirm_pwd"
          value={value}
          onChange={(e) => {
            onChange(e); // Call the first function
            handleInputChange(e); 
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          placeholder=" "
        />

        <label
          onClick={handleLabelClick}
          htmlFor="username"
          className={`
            absolute top-[13px]
            ${dir === 'ltr' ? 'left-12' : 'right-12'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            text-[${labelColor}]
            ${(inputFocus || filled) ? `-translate-y-5 translate-x-2 text-xs ${customActivePlaceHolderBgColor || 'bg-bgPageMain'} px-2` : 'text-base'}
          `}
        >
          {customPlaceHolderText || t("RegistrationPages.Signup.repeatPassword")}
        </label>

        <span 
        onClick={togglePasswordVisibility} 
        className={`absolute ${dir === 'ltr' ? 'right-3' : 'left-3'} top-3 cursor-pointer`}
        style={{ color: iconColor }}
        >
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
        </span>
      </div>

      <p id="confirmnote" className={`${(showErrors && !validMatch && value) ? "instructions" : "hidden"} -mt-3 text-right text-xs mr-4 self-start text-[${textErrorColor}] gap-y-2`}>
        {t("RegistrationPages.Signup.repeatPasswordError1")}
      </p>
      <p id="inputnote" aria-live="polite" className={`${(!value && showErrors ) ? "instructions" : "hidden"} -mt-3 text-right text-xs mr-4 self-start text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.repeatPasswordError2")}
      </p>
    </>
  );
};

export default ConfirmPassInputSignup;