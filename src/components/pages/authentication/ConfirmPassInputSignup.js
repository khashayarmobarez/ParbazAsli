import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import keyIcon from '../../../assets/icons/key-Icon.svg';
import inputStyles from '../../../styles/Inputs/Inputs.module.css';

const ConfirmPassInputSignup = ({ password, onChange, value, focus, onFocus, onBlur }) => {
  const [matchFocus, setMatchFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidMatch(value === password);
  }, [value, password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12 px-2`} htmlFor='confirm_pwd'>
        <span style={{ color: 'var(--disabled-button-text)' }}>
          <img src={keyIcon} alt="icon" className="absolute mt-4 mr-2" />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirm_pwd"
          value={value}
          onChange={onChange}
          className={`${inputStyles.passwordInput} w-[100%] text-sm font-sm`}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => {
            setMatchFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setMatchFocus(false);
            onBlur();
          }}
          placeholder="تکرار رمز عبور"
        />
        <span onClick={togglePasswordVisibility} style={{ color: '#cacaca' }}>
          {showPassword ? (
            <RemoveRedEyeOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
          ) : (
            <VisibilityOffOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
          )}
        </span>
      </div>
      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
        <InfoOutlinedIcon />
        Must match the first password input field.
      </p>
    </>
  );
};

export default ConfirmPassInputSignup;