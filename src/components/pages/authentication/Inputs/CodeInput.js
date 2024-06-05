import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

const CODE_REGEX = /^\d+$/;

const CodeInput = ({ codeRef, onChange, value, focus, onFocus, onBlur }) => {
  const [codeFocus, setCodeFocus] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const result = CODE_REGEX.test(value);
    setValidCode(result);
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event);
    setFilled(event.target.value.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-[100%] rounded-xl px-2'>
      <div className='flex w-full h-12'>
        <span>
          <InfoOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        </span>
        <input
          type="text"
          id="code"
          ref={codeRef}
          autoComplete='one-time-code'
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validCode ? "false" : "true"}
          aria-describedby="codenote"
          onFocus={() => {
            setCodeFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setCodeFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
          placeholder="کد تأیید"
        />
      </div>
      <p id="codenote" className={value && !validCode && filled ? "instructions" : "offscreen"}>
        <InfoOutlinedIcon /> کد تأیید باید فقط عدد باشد
      </p>
    </div>
  );
};

export default CodeInput;