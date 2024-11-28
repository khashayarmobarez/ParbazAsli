import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// Assuming you want to keep some custom styles
import inputStyles from '../../styles/Inputs/Inputs.module.css'

const TextInput = ({ id, value, onChange, placeholder, Type, icon, IsEmptyAfterSubmit, isIconAtTheEnd, customIconSize, customActivePlaceHolderBgColor, ErrorContdition, ErrorContdition2, ErrorText, ErrorText2, disablePlaceholderFloating }) => {
  
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (event) => {
    onChange(event);
    setIsFilled(event.target.value.trim() !== '');
  };

  const handleFocus = () => {
    setIsFocused(true)
    setShowErrors(true)
  };

  const handleBlur = () => setIsFocused(false);

  const handleLabelClick = () => {
    // Focus the input field when the label is clicked
    document.getElementById(id).focus();
  };


  return (
    <div className='flex flex-col w-full items-start'>
      <div className="relative w-full min-h-12">
        <span htmlFor="floatingInput"> 
          { icon ?
            <span className={`absolute mt-3 mr-2 ${customIconSize ? customIconSize : 'w-6'}`}>  
              {icon}
            </span>
            : 
            <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          }
        </span>
        <input 
          type={Type || 'text'}
          id={id}
          placeholder=" "
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value || ''}
          className={`
            peer w-full min-h-12 px-4 pt-1 pb-1 pr-8 rounded-2xl
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none focus:ring-0 focus:border-blue-600
            ${isFilled && inputStyles.inputFilledBorder}
            ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder}
            ${inputStyles.inputText2}
          `}
        />
        <label
          onClick={handleLabelClick}
          htmlFor="floatingInput"
          className={`
            absolute right-9 top-[13px] text-textInputDefault
            transition-all ${disablePlaceholderFloating ? 'duration-0' : 'duration-300'} transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600 
            ${(isFocused || value) ? `-translate-y-5 translate-x-2 text-xs ${customActivePlaceHolderBgColor || 'bg-bgPageMain'} px-2 ${disablePlaceholderFloating && 'invisible'}` : 'text-base'}
            ${isFocused ? 'text-blue-600' : ''}
          `}
        >
          {placeholder || 'وارد کنید'}
        </label>
      </div>
      <div id='errors' className='w-full flex flex-col items-start'>
        {showErrors && ErrorContdition && <span className='text-textError text-xs'>{ErrorText}</span>}
        {showErrors && ErrorContdition2 && <span className='text-textError text-xs'>{ErrorText2}</span>}
      </div>
    </div>
  );
};

export default TextInput;

// icon is optional
//  <TextInput icon{?} value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />