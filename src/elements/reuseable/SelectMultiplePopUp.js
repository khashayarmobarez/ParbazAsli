import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Cube from '../../elements/icons/ThreeDCube';
import inputStyles from '../../styles/Inputs.module.css';
import ButtonStyles from '../../styles/ButtonsBox.module.css';
import TextInput from '../inputs/textInput';
import SearchIcon from '../../elements/icons/SearchIcon';
import Checkbox from '../../modules/authentication/Inputs/CheckBox';  // Update the import path as needed



const SelectMultiplePopUp = ({ options, selectedOptions, handleSelectChange, name, handleRemove, isForSyllabi, Icon, isSubmitted, ErrorCondition, ErrorCondition2, ErrorText, ErrorText2, }) => {
  
  // language
  const dir = Cookies.get('dir') || 'ltr';

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterOptions(value);
  };

  const filterOptions = (value) => {
    const filtered = options.filter(option =>
      option.description.toLowerCase().includes(value.toLowerCase()) &&
      !selectedOptions.some(selected => selected.id === option.id)
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    const isSelected = selectedOptions.some(selected => selected.id === option.id);
    if (isSelected) {
      handleSelectChange(selectedOptions.filter(selected => selected.id !== option.id));
    } else {
      handleSelectChange([...selectedOptions, option]);
    }
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className='flex flex-col w-full md:items-center ' ref={dropdownRef}>
      <div
        ref={inputRef}
        className={`
          ${inputStyles.inputText2}
          ${ErrorCondition && isSubmitted && inputStyles.inputEmptyAfterSubmitBorder}
          ${dir === 'ltr' ? "pl-0" : "pr-9"}
           w-full h-12 placeholder-text-color flex relative rounded-xl items-center justify-start gap-x-4
        `}
        onClick={handleIconClick}
        onFocus={() => setIsOpen(true)}
      >
        <span className="absolute -mt-0 mx-3 w-5">
          { Icon || <Cube customColor = {!selectedOptions && isSubmitted && 'var(--text-error)'} />}
        </span>
        <p className={`${(ErrorCondition && isSubmitted) ? 'text-textError' : 'text-textInputDefault'} mx-10`}>{name}</p>
      </div>

      {isOpen && (
        <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 right-0 w-full h-full flex justify-center items-center backdrop-blur-lg z-[110]`}>
          <div className='w-[90%] md:w-[40%] top-32 z-30 max-h-[65dvh] bg-bgPopUpHeaderFooter flex flex-col items-center rounded-3xl '
          style={{boxShadow:'var(--shadow-all)'}}>
            <div className='w-full flex justify-between items-center bg-bgPopUpHeaderFooter px-2 py-4 rounded-t-3xl text-base'>
              <CloseIcon onClick={handleIconClick} />
              <p>{name}</p>
              <div />
            </div>

            <div className='w-full pt-4 bg-bgHeader px-4'>
              <TextInput 
                id={'TI1'}
                customIconSize={'w-5'}
                placeholder={name}
                value={searchTerm}
                onChange={handleInputChange}
                icon={<SearchIcon anotherColor={'var(--text-input-default)'} />}
                disablePlaceholderFloating={true}
              />
            </div>

            <ul className="w-full bg-bgHeader flex flex-col shadow-lg max-h-[80%] overflow-auto px-4 py-5">
              {filteredOptions.map((option) => (
                <li
                key={option.id}
                className="flex w-full py-3 items-center justify-between text-start hover:bg-bgHeader cursor-pointer"
                onClick={() => handleOptionClick(option)}
                >
                  <Checkbox
                    isChecked={selectedOptions.some(selected => selected.id === option.id)}
                    onToggle={() => handleOptionClick(option)}
                    noLabel={true}
                  />
                  <span className="flex-grow text-xs">{option.description}</span>
                  <div/>
                </li>
              ))}
            </ul>

            <div className='w-full bg-bgPopUpHeaderFooter p-4 rounded-b-3xl flex item-center justify-center'>
              <button 
                onClick={handleIconClick}
                className={`${ButtonStyles.addButton} w-[108px] self-center`}
              >
                اعمال ({selectedOptions.length})
              </button>
            </div>
          </div>
        </div>
        )}

      <div className={`flex flex-wrap items-center w-full ${selectedOptions.length > 0 && 'pt-4'} gap-y-4`}>
        {selectedOptions?.map((option, index) => (
          <div key={option.id} className='w-full px-4 py-3 rounded-3xl flex justify-between items-center bg-bgOutputDefault shadow-lg'>
            <p className='text-sm mx-1'>{index + 1}</p>
            <p className='text-sm px-6 w-full text-start'>{option.description}</p>
            <RemoveIcon
              sx={{
                background: 'var(--bg-input-dropdown)',
                boxShadow: 'var(--shadow-all)',
                borderRadius: '0.5rem',
                color: 'var(--text-error)'
              }}
              onClick={() => handleRemove(option)} 
              className="cursor-pointer" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMultiplePopUp;