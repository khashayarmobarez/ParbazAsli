import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../Utilities/context/TranslationContext';
import Cookies from 'js-cookie';

// icons
import Cube from '../../elements/icons/ThreeDCube';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// css styles 
import inputStyles from '../../styles/Inputs.module.css';

const DropdownInput = ({ id, options, selectedOption, handleSelectChange, name, icon, isDeselectDeactivated, IsEmptyAfterSubmit, isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2 }) => {

  // language
  const dir = Cookies.get('dir') || 'ltr';
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent default button behavior
    setIsOpen(!isOpen);
    setIsFocused(true);
  };

  const handleOptionSelect = (option) => {
    handleSelectChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default behavior for Enter and Space
      handleToggle(event);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex(option => option.id === selectedOption?.id);
        const nextIndex = event.key === 'ArrowDown' 
          ? (currentIndex + 1) % options.length 
          : (currentIndex - 1 + options.length) % options.length;
        handleOptionSelect(options[nextIndex]);
      }
    }
  };

  return (
    <div className='w-full flex flex-col'>
      
      <div className="relative w-full min-h-12" ref={dropdownRef}>
        <span className={`absolute top-3 w-6 z-10
          ${dir === 'ltr'? 'left-2' : 'right-2'}`}>
          {icon ? icon : <Cube customColor={(IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted && 'var(--text-error)' } />}
        </span>
        <button
          ref={buttonRef}
          id={id}
          type="button" // Explicitly set button type to "button"
          className={`
            ${dir === 'ltr' ? 'text-left' : 'text-right pr-10'}
            peer w-full min-h-12 pt-1 pb-1 rounded-2xl
            border-2 border-gray-300 bg-transparent
            text-gray-900 placeholder-transparent
            focus:outline-none focus:ring-0 focus:border-blue-600
            ${selectedOption ? inputStyles.inputFilledBorder : ''}
            ${!selectedOption && isSubmitted && inputStyles.inputEmptyAfterSubmitBorder}
            ${!selectedOption && 'text-textDisabled'}
            ${inputStyles.inputDropdown}
          `}
          style={{paddingLeft: dir === 'ltr' && '2.5rem' }}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption ? selectedOption.name : ''}
        </button>
        <label
          onClick={(e) => { e.preventDefault(); buttonRef.current.focus(); setIsOpen(true) }}
          htmlFor={id}
          className={`
            absolute top-[14px] 
            ${((IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted) ? 'text-textError' : 'text-textInputDefault'}
            transition-all duration-300 transform
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:text-xs
            peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600
            ${dir === 'ltr'? 'left-10' : 'right-10'}
            ${(isFocused || selectedOption) ? '-translate-y-5 translate-x-2 text-xs bg-bgPageMain px-2' : 'text-sm'}
            ${isFocused ? 'text-blue-600' : ''}
          `}
        >
          {name || t("inputs.dateInput.date")}
        </label>
        <span onClick={handleToggle} className={`absolute top-0 h-full flex items-center pr-2 cursor-pointer
        ${dir === 'ltr'? 'right-3' : 'left-3'}`}>
          <ArrowBackIosNewIcon sx={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)', transition: 'transform 0.3s ease', 
          color:((IsEmptyAfterSubmit || ErrorCondition2 || ErrorCondition) && isSubmitted) ? 'var(--text-error)' : 'var(--text-input-default)'
          }} />
        </span>
        {isOpen && (
        <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 w-full h-full flex justify-center items-center backdrop-blur-lg z-[110]
        ${dir === 'ltr'? 'left-0' : 'right-0'}`} 
        onClick={() => setIsOpen(false)}>
            <ul
              className="fixed z-30 w-[90%] top-60 bg-bgPopUpDefault rounded-xl shadow-lg max-h-80 overflow-auto md:w-[40%]"
              role="listbox"
            >
              {!isDeselectDeactivated && (
                <>
                  <li
                    className="p-5 hover:bg-gray-100 cursor-pointer flex"
                    onClick={() => handleOptionSelect(null)}
                    role="option"
                    aria-selected={!selectedOption}
                  >
                    <span className={`w-6 h-6 border-2 border-textAccent rounded-full flex items-center justify-center
                    ${dir === 'ltr'? 'mr-2' : 'ml-2'}`}>
                      {!selectedOption && <span className="w-3 h-3 bg-textAccent rounded-full "></span>}
                    </span>
                    {name || t("inputs.DropdownInput.choose")}
                  </li>
                  <div className="w-full h-[1px] bg-[#535353]" />
                </>
              )}
              {options?.map((option, index) => (
                <>
                  <li
                    key={option.id}
                    className="p-5 hover:bg-gray-100 cursor-pointer flex items-center "
                    onClick={() => handleOptionSelect(option)}
                    role="option"
                    aria-selected={selectedOption?.id === option.id}
                  >
                    <span className={`w-6 h-6 border-2 border-textAccent rounded-full flex items-center justify-center
                    ${dir === 'ltr'? 'mr-2' : 'ml-2'}`}>
                      {selectedOption?.id === option.id && <span className="w-3 h-3 bg-textAccent rounded-full"></span>}
                    </span>
                    {option.name}
                  </li>
                  {/* Add a separator after each option except the last one */}
                  {index < options.length - 1 && <div className="w-full h-[1.8px] bg-[#535353]" />}
                </>
              ))}
              </ul>
          </div>
          )}
      </div>
      {
        (selectedOption || isSubmitted) && (ErrorCondition || ErrorCondition2) &&
        <div id='errors' className='w-full flex flex-col items-start -mt-1'>
          {ErrorCondition && <span className='text-textError text-xs mt-1'>{ErrorText}</span>}
          {ErrorCondition2 && <span className='text-textError text-xs mt-1'>{ErrorText2}</span>}
        </div>
      }
    </div>
  );
};

export default DropdownInput;