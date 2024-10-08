import React, { useState, useRef, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg';
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const SearchMultipleSelectStudent = ({ options, selectedOptions, handleSelectChange, name, handleRemove, Icon }) => {
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
      option.fullName.toLowerCase().includes(value.toLowerCase()) &&
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
        <span>
          <img src={Icon || Cube} alt='icon' className='absolute mt-3 mr-2 w-6' />
        </span>
        <input
          ref={inputRef}
          type="text"
          className={`${inputStyles.inputDropdown} w-[100%] pl-10 pr-10 placeholder-text-color`}
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
        <ul className="absolute z-20 w-[90%] bg-[var(--dark-blue-bg)] mt-12 rounded-xl shadow-lg max-h-60 overflow-auto" >
          
          {filteredOptions.map((option) => (
            <div className='flex flex-col w-full items-center justify-center '>
              <li
                key={option.id}
                className="px-4 py-2 w-full hover:bg-[var(--corn-flower-blue)] cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.fullName}
              </li>
              <div className='w-full h-[1px] bg-[var(--low-opacity-white)]' />
            </div>
          ))}
        </ul>
      )}

      <div className='flex flex-wrap items-center w-full py-0'>
        {selectedOptions?.map((option, index) => (
          // <div key={option.id} className='p-1 w-full bg-[#282C4C] rounded-xl flex justify-between items-center mt-2'>
          //   <p className='text-sm mx-1'>{option.name} - {option.status}</p>
          //   <ClearIcon onClick={() => handleRemove(option)} className="cursor-pointer" />
          // </div>
          <li key={option.id} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
          style={{background:  'var(--profile-buttons-background)',
              boxShadow: 'var(--profile-buttons-boxShadow)'}}>
              <p className=' text-sm mx-1' >{index + 1}</p>
              <p className='text-sm px-6 w-full text-start'>{option.fullName} </p>
              <RemoveIcon sx={{background:  'var(--profile-buttons-background)',
              boxShadow: 'var(--profile-buttons-boxShadow)',
              borderRadius:'0.5rem',
              color:'var(--red-text)'}}
              className="cursor-pointer"
              onClick={() => handleRemove(option)} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default SearchMultipleSelectStudent;