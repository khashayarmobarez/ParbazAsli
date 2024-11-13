import React, { useState } from 'react';

// mui
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

// assets 
import KeyIcon from '../../../../components/icons/KeyIcon';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PasswordInputLogin = ({ onChange, value, focus, onFocus, onBlur, customPlaceHolder, isSubmitted }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  
  const [filled, setFilled] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false);
  
  // Separate states for different elements
  const [iconColor, setIconColor] = useState('var(--text-default)');
  const [borderColorClass, setBorderColorClass] = useState('');
  const [eyeIconColor, setEyeIconColor] = useState('var(--text-default)');

  const ErrorConditionMet = !value && isSubmitted;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    onChange(e);
    setFilled(e.target.value.trim() !== '');
  };

  const updateColors = (isFocused, isFilled) => {
    if (isFocused) {
      setIconColor('var(--text-input-selected)');
      setEyeIconColor('var(--text-input-selected)');
      setBorderColorClass(inputStyles.inputSelectedBorder);
    } else if (isFilled) {
      setIconColor('var(--text-accent)');
      setEyeIconColor('var(--text-accent)');
      setBorderColorClass(inputStyles.inputValidBorder);
    } else if (ErrorConditionMet || (!isFilled && isSubmitted)) {
      setIconColor('var(--text-error)');
      setEyeIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
    } else {
      setIconColor('var(--text-error)');
      setEyeIconColor('var(--text-error)');
      setBorderColorClass(inputStyles.inputErrorBorder);
      setLeftEmpty(true);
    }
  };

  const handleFocus = () => {
    setInputFocus(true);
    updateColors(true, filled);
    onFocus();
    setLeftEmpty(false);
  };

  const handleBlur = () => {
    setInputFocus(false);
    updateColors(false, filled);
    onBlur();
  };

  const handleLabelClick = () => {
    document.getElementById('password').focus();
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl px-2'>
      <div className='relative w-full min-h-12'>
        <span className="absolute right-2 top-3 w-5 z-10">
          <KeyIcon customColor={iconColor} />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value}
          onChange={handleInputChange}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" "
          autoComplete="new-password"
        />
        <label
          onClick={handleLabelClick}
          htmlFor="password"
          className={`
            absolute right-9 top-[13px]
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs
            text-[var(--text-input-default)]
            ${(inputFocus || filled || value) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2 rounded' : 'text-base'}
          `}
        >
          {customPlaceHolder || "رمز عبور"}
        </label>
        <span 
          onClick={togglePasswordVisibility} 
          className="absolute left-5 top-3 cursor-pointer"
          style={{ color: eyeIconColor }}
        >
          {showPassword ? (
            <RemoveRedEyeOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </span>
      </div>
      <p id="inputnote" className={`${((!value && isSubmitted) || leftEmpty) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-textError`}>
        *رمز عبور الزامی است
      </p>
    </div>
  );
};

export default PasswordInputLogin;