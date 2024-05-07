import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailInputSignup = ({ emailRef, onChange, value, focus, onFocus, onBlur }) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(value);
    setValidEmail(result);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='flex w-full h-12'>
        <span>
          <EmailOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        </span>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => {
            setEmailFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setEmailFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="ایمیل"
        />
      </div>
      <p id="emailnote" className={value && !validEmail && filled ? "instructions" : "offscreen"}>
        <InfoOutlinedIcon /> Please enter a valid email address.
      </p>
    </div>
  );
};

export default EmailInputSignup;