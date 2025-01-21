import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Cookies from 'js-cookie';

// Assuming you want to keep some custom styles
import inputStyles from '../../styles/Inputs.module.css'
import { useTranslation } from '../../Utilities/context/TranslationContext';

const TextInput = ({ id, value, onChange, placeholder, Type, icon, IsEmptyAfterSubmit, isIconAtTheEnd, customIconSize, customActivePlaceHolderBgColor, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2, disablePlaceholderFloating, className, isSubmitted }) => {
  
  // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

  const [isFocused, setIsFocused] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (event) => {
    onChange(event);
  };

  const handleFocus = () => {
    setIsFocused(true)
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setShowErrors(true)
  }

  const handleLabelClick = () => {
    // Focus the input field when the label is clicked
    document.getElementById(id).focus();
  };


  return (
    <div className={`flex flex-col w-full items-start ${className}`}>
      <div className="relative w-full min-h-12">
        <span htmlFor="floatingInput">
          { 
          icon ?
            <span className={`absolute mt-3 mr-2 
              ${dir === 'ltr' ? 'ml-2' : `mr-2`}
              ${customIconSize ? customIconSize : 'w-6'}`}
            >  
              {icon}
            </span>
            :
            <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0'
            , color:(IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted && 'var(--text-error)' }} />
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
            peer w-full min-h-12 px-4 pt-1 pb-1 rounded-2xl
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            ${dir === 'ltr' ? 'pl-8' : `pr-8`}
            ${value && !ErrorCondition && !ErrorCondition2 && inputStyles.inputFilledBorder}
            ${(IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && showErrors && inputStyles.inputEmptyAfterSubmitBorder}
            ${inputStyles.inputText2}
          `}
        />
          {/* ${((IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted) ? 'text-textError' : ''} */}
        <label
          onClick={handleLabelClick}
          htmlFor="floatingInput"
          className={`
            ${dir === 'ltr' ? 'left-9' : `right-9`}
            absolute top-[13px] 
            text-textInputDefault
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
        {(showErrors || isSubmitted) && ErrorCondition && <span className='text-textError text-start text-xs mt-1'>{ErrorText}</span>}
        {(showErrors || isSubmitted) && ErrorCondition2 && <span className='text-textError text-start text-xs mt-1'>{ErrorText2}</span>}
      </div>
    </div>
  );
};

export default TextInput;

// icon is optional
//  <TextInput icon{?} value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />