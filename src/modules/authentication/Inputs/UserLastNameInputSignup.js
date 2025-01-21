import React, { useState, useEffect } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import inputStyles from '../../../styles/Inputs.module.css';
import { USER_REGEX } from '../../../Utilities/Providers/regexProvider';
import Cookies from 'js-cookie';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';


const UserLastNameInputSignup = ({ userRef, onChange, value, focus, onFocus, onBlur, isSubmitted }) => {

  // language
  const { t } = useTranslation();
  const dir = Cookies.get('dir') || 'ltr';

  const [validName, setValidName] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [labelColor, setLabelColor] = useState('var(--text-input-default)');
  const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

  const ErrorConditionMet = (value && !validName && filled) || (!value && isSubmitted);

  useEffect(() => {
    const result = USER_REGEX.test(value) && value.length >= 3 && value.length <= 24;
    setValidName(result);

    if (!value && isSubmitted && !inputFocus) {
      setIconColor('var(--text-error)');
      setLabelColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setShowErrors(true);
    }
  }, [value, isSubmitted]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  const handleLabelClick = () => {
    document.getElementById('userLastname').focus();
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, validName, filled);
    onFocus();
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, validName, filled);
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
    <div className='flex flex-col relative w-full rounded-xl'>
      <div className='relative w-full min-h-12'>
        <span className={`absolute ${dir === 'ltr' ? 'left-3' : 'right-3'} top-3 w-5 z-10 cursor-text`}>
          <PersonOutlineOutlinedIcon sx={{ color: iconColor }} />
        </span>
        <input
          type="text"
          id="userLastname"
          ref={userRef}
          autoComplete="family-name"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 ${dir === 'ltr' ? 'pl-10' : 'pr-10'}
            rounded-2xl border-2 bg-transparent
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
          htmlFor="userLastname"
          className={`
            absolute  top-[13px]
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
          {t("RegistrationPages.Signup.userLastnameInput")}
        </label>
      </div>
      <p id="uidnote" aria-live="polite" className={`${value && !USER_REGEX.test(value) && showErrors ? "instructions" : "hidden"} mt-2 ${dir === 'ltr' ? 'text-left' : 'text-right'} text-xs mr-4 text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.usernameInputError1")}
      </p>
      <p id="uidnote" aria-live="polite" className={`${(value && (value?.length < 3 || value?.length > 24)) && showErrors ? "instructions" : "hidden"} mt-2 ${dir === 'ltr' ? 'text-left' : 'text-right'} text-xs mr-4 text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.usernameInputError2")}<br />
      </p>
      <p id="inputnote" aria-live="polite" className={`${(!value && showErrors) ? "instructions" : "hidden"} mt-2 ${dir === 'ltr' ? 'text-left' : 'text-right'} text-xs mr-4 text-[${textErrorColor}]`}>
        {t("RegistrationPages.Signup.userLastnameInputError3")}
      </p>
    </div>
  );
};

export default UserLastNameInputSignup;