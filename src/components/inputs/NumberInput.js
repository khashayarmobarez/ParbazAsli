import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const NumberInput = ({ id,value, onChange, placeholder, icon, IsEmptyAfterSubmit, customIconSize,isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2  }) => {

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) { // Allow only numbers
      onChange(event);
      setIsFilled(newValue.trim() !== '');
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false)
    setShowErrors(true)
  };

  const handleLabelClick = () => {
    // Focus the input field when the label is clicked
    document.getElementById(id).focus();
  };

  return (
    <div className='w-full flex flex-col'>
      <div className="relative w-full min-h-12">
        <span onClick={handleLabelClick}> 
          { icon ?
            <span className={`absolute mt-3 mr-2 ${customIconSize ? customIconSize : 'w-6'}`}>  
              {icon}
            </span>
            : 
            <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          }
        </span>
        <input 
          type="number"
          id={id}
          placeholder=" "
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value || ''}
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-8 rounded-2xl z-10
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none focus:ring-0 focus:border-blue-600
            ${isFilled && inputStyles.inputFilledBorder}
            ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder}
            ${inputStyles.inputText2}
          `}
        />
        <label
          htmlFor="floatingNumberInput"
          className={`
            absolute right-9 top-[13px] text-textInputDefault z-0
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
            ${(isFocused || value) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-base'}
            ${isFocused ? 'text-blue-600' : ''}
          `}
          onClick={handleLabelClick}
        >
          {placeholder || 'عدد وارد کنید'}
        </label>
      </div>
      <div id='errors' className='w-full flex flex-col items-start'>
        {(showErrors || isSubmitted) && ErrorCondition && <span className='text-textError text-xs mt-1'>{ErrorText}</span>}
        {(showErrors || isSubmitted) && ErrorCondition2 && <span className='text-textError text-xs mt-1'>{ErrorText2}</span>}
      </div>
    </div>
  );
};

export default NumberInput;