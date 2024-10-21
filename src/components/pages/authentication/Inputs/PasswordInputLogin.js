import React, { useState } from 'react';

// mui
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

// assets 
import KeyIcon from '../../../../components/icons/KeyIcon';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const PasswordInputLogin = ({ onChange, value, focus, onFocus, onBlur, customPlaceHolder }) => {

  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  
  const [filled, setFilled] = useState(false);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={`${inputStyles['password-input']} flex relative w-full h-12 px-2`} htmlFor="password">
        <span style={{ color: 'var(--disabled-button-text)'  }} className="absolute w-4 mt-4 mr-2"  >
          <KeyIcon />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value}
          onChange={(e) => {
            onChange(e); // Call the first function
            setFilled(e.target.value.trim() !== ''); // Update filled state
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%]  pr-8`}
          required
          aria-describedby="pwdnote"
          onFocus={() => {
            setPwdFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setPwdFocus(false);
            onBlur();
          }}
          placeholder={customPlaceHolder || "رمز عبور"}
          autoComplete="new-password" 
        />
        <span onClick={togglePasswordVisibility} style={{ color: 'var(--text-default)' }}>
          {showPassword ? (
            <RemoveRedEyeOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
          ) : (
            <VisibilityOffOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
          )}
        </span>
      </div>
    </>
  );
};

export default PasswordInputLogin;