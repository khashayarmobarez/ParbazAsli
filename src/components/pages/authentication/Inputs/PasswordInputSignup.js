  import React, { useState, useEffect } from 'react';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
  import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
  import keyIcon from '../../../../assets/icons/key-Icon.svg';
  import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

  const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;

  const PasswordInputSignup = ({ onChange, value, focus, onFocus, onBlur }) => {
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [showPassword, setShowPassword] = useState(false);  
    const [filled, setFilled] = useState(false);

    useEffect(() => {
      setValidPwd(PWD_REGEX.test(value));
    }, [value]);

      const handleInputChange = (event) => {
        onChange(event);
        setFilled(event.target.value.trim() !== '');
      };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <>
        <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12 px-2`} htmlFor="password">
          <span style={{ color: 'var(--disabled-button-text)' }}>
            <img src={keyIcon} alt="icon" className="absolute mt-4 mr-2" />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={value}
            onChange={(e) => {
              onChange(e); // Call the first function
              handleInputChange(e); 
            }}
            className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] text-sm font-sm pr-8`}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => {
              setPwdFocus(true);
              onFocus();
            }}
            onBlur={() => {
              setPwdFocus(false);
              onBlur();
            }}
            placeholder="رمز عبور"
          />
          <span onClick={togglePasswordVisibility} style={{ color: '#cacaca' }}>
            {showPassword ? (
              <RemoveRedEyeOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
            ) : (
              <VisibilityOffOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
            )}
          </span>
        </div>
        <p id="pwdnote" className={filled && !validPwd ? "instructions" : "offscreen"}>
          <InfoOutlinedIcon />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
          <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
          <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>
      </>
    );
  };

  export default PasswordInputSignup;