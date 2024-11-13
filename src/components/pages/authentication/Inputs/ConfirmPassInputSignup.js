import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import KeyIcon from '../../../../components/icons/KeyIcon';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const ConfirmPassInputSignup = ({ password, onChange, value, focus, onFocus, onBlur, isSubmitted }) => {

  const [validMatch, setValidMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filled, setFilled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false)

  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');

  const ErrorConditionMet = (value && !validMatch && filled) || (!value && isSubmitted);

  useEffect(() => {
    setValidMatch(value === password);
  }, [value, password]);

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
    <>
      <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12 px-2`} htmlFor='confirm_pwd'>
        <span className="absolute right-6 top-3 w-5 z-10"  >
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
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl
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
            absolute right-14 top-[13px]
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            text-[var(--text-input-default)]
            ${(inputFocus || filled) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-base'}
          `}
        >
          رمز عبور
        </label>

        <span 
          onClick={togglePasswordVisibility} 
          className="absolute left-5 top-3 cursor-pointer"
          style={{ color: iconColor }}
          >
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
        </span>
      </div>

      <p id="confirmnote" className={`${filled && !validMatch ? "instructions" : "hidden"} -mt-4 text-right text-xs mr-6 text-textError gap-y-2`}>
        *باید با اولین قسمت ورودی رمز عبور مطابقت داشته باشد.
      </p>
      <p id="inputnote" aria-live="polite" className={`${((!value && isSubmitted ) || leftEmpty) ? "instructions" : "hidden"} -mt-4 text-right text-xs mr-6 text-textError`}>
        *تکرار رمز عبور الزامی می باشد
      </p>
    </>
  );
};

export default ConfirmPassInputSignup;