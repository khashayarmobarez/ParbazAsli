import React, { useState, useRef, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../components/icons/ThreeDCube';
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const SearchMultipleSelect = ({ options, selectedOptions, handleSelectChange, name, handleRemove, isForSyllabi, Icon }) => {
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
    setIsOpen(true);
  };

  const filterOptions = (value) => {
    const filtered = options.filter(option =>
      option.description.toLowerCase().includes(value.toLowerCase()) &&
      !selectedOptions.some(selected => selected.id === option.id)
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.some(selected => selected.id === option.id)) {
      handleSelectChange([...selectedOptions, option]);
    }
    setSearchTerm('');
    filterOptions('');
    setIsOpen(false);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className='flex flex-col w-full' ref={dropdownRef}>
      <div className='flex relative w-[100%] h-12 rounded-xl'>
        <span className="absolute -mt-0 mr-2 w-5">
          {Icon ? 
            Icon
            :
            <Cube />
          }
        </span>
        <input
          ref={inputRef}
          type="text"
          className={`${inputStyles.inputDropdown} w-full pl-10 pr-8 placeholder-text-color`}
          placeholder={name}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <span 
          onClick={handleIconClick}
          className='absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
        >
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
        </span>
      </div>

      {isOpen && (
        <ul className="absolute z-20 w-[90%] mt-12 bg-[var(--dark-blue-bg)] rounded-2xl shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div className='flex flex-col w-full items-center justify-center '>
              <li
                key={option.id}
                className="px-4 py-2 w-full hover:bg-[var(--corn-flower-blue)] cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.description}
              </li>
              <div className='w-full h-[1px] bg-textDisabled' />
            </div>
          ))}
        </ul>
      )}

      <div className={`flex flex-wrap items-center w-full ${selectedOptions.length > 0 && 'pt-4'} gap-y-4`}>
        {selectedOptions?.map((option, index) => (
          <div key={option.id} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center'
          style={{background:  'var(--profile-buttons-background)',
          boxShadow: 'var(--profile-buttons-boxShadow)'}}>
            <p className=' text-sm mx-1' >{index + 1}</p>
            <p className='text-sm px-6 w-full text-start'>{option.description}</p>
            <RemoveIcon sx={{background:  'var(--profile-buttons-background)',
            boxShadow: 'var(--profile-buttons-boxShadow)',
            borderRadius:'0.5rem',
            color:'var(--text-error)'}}
            onClick={() => handleRemove(option)} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMultipleSelect;


// Usage
  // <SearchMultipleSelect
    // options={syllabiData.data}
    // selectedOptions={selectedSyllabi}
    // handleSelectChange={handleSelectChangeSyllabi}
    // name="سیلابس ها"
    // handleRemove={handleRemoveSyllabi}
    // isForSyllabi={true}
  // />