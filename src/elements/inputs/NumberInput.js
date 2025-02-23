import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Cookies from 'js-cookie';

// css styles 
import inputStyles from '../../styles/Inputs.module.css';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const NumberInput = ({ id, value, onChange, placeholder, icon, IsEmptyAfterSubmit, customIconSize,isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2  }) => {

  // language
  const dir = Cookies.get('dir') || 'ltr';
  const { t } = useTranslation();
  
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
            <span className={`absolute mt-3  
            ${customIconSize ? customIconSize : 'w-6'}
            ${dir === 'ltr' ? 'ml-2.5' : 'mr-2.5'}`} >
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
            peer w-full min-h-12 px-4 pt-1 pb-1 rounded-2xl z-10
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            ${dir === 'ltr' ? 'pl-10' : 'pr-10'}
            ${value && inputStyles.inputFilledBorder}
            ${isSubmitted && !value && inputStyles.inputEmptyAfterSubmitBorder}
            ${inputStyles.inputText2}
          `}
        />
        <label
          htmlFor="floatingNumberInput"
          className={`
            absolute top-[13px] z-0
            ${((IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted) ? 'text-textError' : 'text-textInputDefault'}
            ${dir === 'ltr' ? 'left-9' : 'right-9'}
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
        {(showErrors || isSubmitted) && ErrorCondition && <span className='text-textError text-xs mt-1 text-start'>{ErrorText}</span>}
        {(showErrors || isSubmitted) && ErrorCondition2 && <span className='text-textError text-xs mt-1 text-start'>{ErrorText2}</span>}
      </div>
    </div>
  );
};

export default NumberInput;