import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import inputStyles from '../../../styles/Inputs/Inputs.module.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;

const UserNameInputSignup = ({ userRef, onChange, value, focus, onFocus, onBlur }) => {
  const [userFocus, setUserFocus] = useState(false);
  const [validName, setValidName] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(value);
    setValidName(result);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='flex w-full h-12'>
        <span>
          <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        </span>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {
            setUserFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setUserFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="نام"
        />
      </div>
      <p id="uidnote" className={userFocus && value && !validName ? "instructions" : "offscreen"}>
        <InfoOutlinedIcon />
        3 to 24 characters.<br />
        Must begin with a letter<br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
    </div>
  );
};

export default UserNameInputSignup;