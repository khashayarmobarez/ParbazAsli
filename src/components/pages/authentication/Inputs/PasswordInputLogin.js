import React, { useState } from 'react';

// mui
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

// assets 
import KeyIcon from '../../../../components/icons/KeyIcon';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PasswordInputLogin = ({ onChange, value, focus, onFocus, onBlur, customPlaceHolder, isSubmitted }) => {
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  
  const [filled, setFilled] = useState(false);
  const [leftEmpty, setLeftEmpty] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    onChange(e);
    setFilled(e.target.value.trim() !== '');
  };

  const handleFocus = () => {
    setPwdFocus(true);
    onFocus();


    setLeftEmpty(false)
  };

  const handleBlur = () => {
    setPwdFocus(false);
    onBlur();

    if (value.trim() === '') {
      setLeftEmpty(true);
    }
  };

  const handleLabelClick = () => {
    document.getElementById('password').focus();
  };

  return (
    <div className='flex flex-col relative w-full'>
      <div className="relative w-full min-h-12 px-2">
        <span className="absolute right-5 top-4 w-4 z-10"
        style={{ color: 'var(--disabled-button-text)' }}>
          <KeyIcon />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value}
          onChange={handleInputChange}
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none focus:ring-0 focus:border-blue-600
            ${filled && inputStyles.inputFilledBorder}
            ${inputStyles.inputText2}
          `}
          required
          aria-describedby="pwdnote"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" "
          autoComplete="new-password" 
        />
        <label
          onClick={handleLabelClick}
          htmlFor="password"
          className={`
            absolute right-11 top-[13px] text-textInputDefault
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
            ${(pwdFocus || value) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-base'}
            ${pwdFocus ? 'text-blue-600' : ''}
          `}
        >
          {customPlaceHolder || "رمز عبور"}
        </label>
        <span 
          onClick={togglePasswordVisibility} 
          className="absolute left-5 top-3 cursor-pointer"
          style={{ color: 'var(--text-default)' }}
        >
          {showPassword ? (
            <RemoveRedEyeOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </span>
      </div>
      <p id="inputnote" className={`${(leftEmpty || (isSubmitted && !value)) ? "instructions" : "hidden"} mt-2 text-right text-xs mr-4 text-textError`}>
        *رمز عبور الزامی است
      </p>
    </div>
  );
};

export default PasswordInputLogin;