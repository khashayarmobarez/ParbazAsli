import React, { useRef, useState } from 'react';
import { DatePicker as ZamanDatePicker } from 'zaman';
import Cookies from 'js-cookie';

// styles
import inputStyles from '../../styles/Inputs.module.css';

// assets
import CalenderIcon from '../icons/CalenderIcon';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const DateInput = ({
  defaultValue, value, onChange, customShowDateFormat,
  position = 'right', placeH, icon, IsEmptyAfterSubmit,
  isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2,
  customActivePlaceHolderBgColor
}) => {

  const dateInputRef = useRef(null);

  
  // language
  const dir = Cookies.get('dir') || 'ltr';
  const { t } = useTranslation();
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [filled, setFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (date) => {
    setSelectedDate(date);
    setFilled(true);
    if (onChange) {
      onChange(date);
    }
  };

  const handleChangeLtr = (event) => {
    const date = event.target.value;
    console.log(date)
    setSelectedDate(date);
    setFilled(true);
    if (onChange) {
      onChange(date);
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Opens the native date picker
    }
  };
  
  return (
    <div className="w-full flex relative">
      {dir === 'ltr' ? (
        // Native Date Input for LTR Mode
        <div className="relative w-full" onClick={openDatePicker}>
          {/* Calendar Icon */}
          <span className={`absolute mt-3.5 w-5 ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`}>
            {icon ? 
              icon
              :
              <CalenderIcon customColor={(!selectedDate || ErrorCondition2 || ErrorCondition) && isSubmitted && 'var(--text-error)'} />
            }
          </span>

          {/* Native Date Picker Input */}
          <input
            type="date"
            value={selectedDate}
            onChange={handleChangeLtr}
            ref={dateInputRef}
            className={`w-full pl-10 pr-6 py-3 rounded-[16px] border ${
              ((ErrorCondition || ErrorCondition2) && isSubmitted) 
                ? 'border-red-500' 
                : 'border-[var(--border-input-default)]'
            } bg-[var(--bg-page-main)] text-textDefault focus:outline-none`}
          />
          <label
            
            htmlFor="floatingInput"
            className={`
              ${dir === 'ltr' ? 'left-9' : `right-9`}
              absolute top-[13px] 
              text-textInputDefault
              transition-all transform
              peer-placeholder-shown:translate-y-0
              peer-placeholder-shown:text-sm
              peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-blue-600 
              -translate-y-5 translate-x-2 text-xs ${customActivePlaceHolderBgColor || 'bg-bgPageMain'} px-2
              ${isFocused ? 'text-blue-600' : ''}
            `}
          >
            {placeH || 'وارد کنید'}
          </label>

          {/* Error Messages */}
          {(selectedDate || isSubmitted) && (ErrorCondition || ErrorCondition2) && (
            <div id="errors" className="w-full flex flex-col items-start mt-1">
              {ErrorCondition && <span className="text-red-500 text-xs">{ErrorText}</span>}
              {ErrorCondition2 && <span className="text-red-500 text-xs">{ErrorText2}</span>}
            </div>
          )}
        </div>
      ) : (
        // Zaman DatePicker for RTL Mode
        <>
          {/* Calendar Icon */}
          <span className={`absolute mt-3 w-5 ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`}>
            {icon ? 
              icon
              :
              <CalenderIcon customColor={(!selectedDate || ErrorCondition2 || ErrorCondition) && isSubmitted && 'var(--text-error)'} />
            }
          </span>

          <ZamanDatePicker
            onChange={(e) => handleChange(e.value)}
            show={true}
            inputClass={` ${filled && inputStyles.inputFilledBorder} 
              ${((ErrorCondition || ErrorCondition2) && isSubmitted) ? inputStyles.customDateInputError : inputStyles.customDateInput} `}
            position={position}
            round="thin"
            accentColor="#23bc7c"
            locale="fa"
            inputAttributes={{ placeholder: placeH }}
            direction="rtl"
          />

          {/* Floating Label */}
          {filled && (
            <label
              htmlFor="floatingDropdown"
              className="absolute right-10 top-[14px] -translate-y-[21px] translate-x-2 text-xs bg-bgPageMain px-2"
            >
              {placeH || 'تاریخ'}
            </label>
          )}

          {/* Error Messages */}
          {(selectedDate || isSubmitted) && (ErrorCondition || ErrorCondition2) && (
            <div id="errors" className="w-full flex flex-col items-start -mt-3">
              {ErrorCondition && <span className="text-textError text-xs -mt-1">{ErrorText}</span>}
              {ErrorCondition2 && <span className="text-textError text-xs -mt-1">{ErrorText2}</span>}
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default DateInput;
