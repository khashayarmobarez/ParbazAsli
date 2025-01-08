import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import inputStyles from '../../../styles/Inputs.module.css';

function isValidIranianNationalCode(input) {
  if (!/^\d{10}$/.test(input)) return false;
  const check = +input[9];
  const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}

const NationalCodeInput = ({ nationalCodeRef, onChange, value, focus, onFocus, onBlur }) => {
  const [nationalCodeFocus, setNationalCodeFocus] = useState(false);
  const [validNationalCode, setValidNationalCode] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const isValid = isValidIranianNationalCode(value);
    setValidNationalCode(isValid);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl'>
      <div className='flex w-full h-12'>
        <span>
          <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        </span>
        <input
          type="text"
          id="nationalCode"
          ref={nationalCodeRef}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validNationalCode ? "false" : "true"}
          aria-describedby="nationalCodenote"
          onFocus={() => {
            setNationalCodeFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setNationalCodeFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="کد ملی"
        />
      </div>
      <p id="nationalCodenote" className={value && !validNationalCode && filled ? "instructions" : "hidden"}>
        <InfoOutlinedIcon /> Invalid Iranian National Code.
      </p>
    </div>
  );
};

export default NationalCodeInput;