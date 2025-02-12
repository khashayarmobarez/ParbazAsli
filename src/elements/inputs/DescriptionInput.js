import React, { useState } from 'react';
import Cookies from 'js-cookie';

// css styles 
import inputStyles from '../../styles/Inputs.module.css'

const DescriptionInput = ({ value, onChange, placeholder, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2, isSubmitted, className }) => {

  const dir = Cookies.get('dir') || 'ltr';

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    onChange(event); // Call the onChange function passed from the parent component
    setIsFilled(event.target.value.trim() !== ''); // Check if the input is filled
  };

  const handleFocus = () => {
    setIsFocused(true)
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setShowErrors(true)
  }

  return (
    <div className={`flex flex-col w-full items-start ${className}`}>
      <div className='relative w-full min-h-28 rounded-2xl'>
        <textarea 
          id="floatingDescription"
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value || ''}
          className={`
            peer w-full min-h-28 px-3 py-3 rounded-xl
            border-2 border-gray-300 bg-transparent
            text-gray-900 text-sm placeholder-transparent
            focus:outline-none focus:ring-0 focus:border-blue-600
            ${isFilled && inputStyles.inputFilledBorder}
            ${(!value || ErrorCondition2 || ErrorCondition) && isSubmitted && inputStyles.inputEmptyAfterSubmitBorder}
            ${inputStyles.inputDescription}
          `}
          placeholder=" "
        />
        <label
          htmlFor="floatingDescription"
          className={`
            absolute top-2 
            ${dir === 'ltr' ? 'left-3' : 'right-3'}
            ${((!value || ErrorCondition2 || ErrorCondition) && isSubmitted) ? 'text-textError' : 'text-textInputDefault'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-sm
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
            ${(isFocused || value) ? '-translate-y-5 -translate-x-2 text-xs bg-bgPageMain px-2' : 'text-sm'}
            ${isFocused ? 'text-blue-600' : ''}
          `}
        >
          {placeholder || 'توضیحات را وارد کنید'}
        </label>
      </div>
      <div id='errors' className='w-full flex flex-col items-start'>
        {(showErrors || isSubmitted) && ErrorCondition && <span className='text-textError text-xs mt-1'>{ErrorText}</span>}
        {(showErrors || isSubmitted) && ErrorCondition2 && <span className='text-textError text-xs mt-1'>{ErrorText2}</span>}
      </div>
    </div>
  ); 
};

export default DescriptionInput;

// icon is optional
//  <TextInput icon{?} value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />