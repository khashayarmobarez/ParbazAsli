import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Cube from '../../assets/icons/3dCube.svg';
import inputStyles from '../../styles/Inputs/Inputs.module.css';
import { Checkbox } from '@mui/material';
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'
import TextInput from '../inputs/textInput';
import searchIcon from '../../assets/icons/searchIcon.svg';

const SelectMultiplePopUp = ({ options, selectedOptions, handleSelectChange, name, handleRemove, isForSyllabi, Icon }) => {

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
    <div className='flex flex-col w-full md:items-center' ref={dropdownRef}>
        <div
          ref={inputRef}
          className={`${inputStyles.inputText2} pr-4 w-full h-12 placeholder-text-color flex relative rounded-xl items-center justify-start gap-x-4 `}
          
          onClick={handleIconClick}
          onFocus={() => setIsOpen(true)}
        >

            <span className='h-full flex justify-center items-center'>
                <img src={Icon || Cube} alt='icon' className='absolute w-5 ' />
            </span>

            <p>{name}</p>

        </div>


        {isOpen && (
            <div className=' w-[90%] md:w-[40%] fixed top-32 z-30 max-h-[65dvh] bg-bgPopUpHeaderFooter flex flex-col items-center rounded-2xl '>
            
                <div className='w-full flex justify-between items-center bg-bgPopUpHeaderFooter px-2 py-4 rounded-t-2xl'>
                    <CloseIcon onClick={handleIconClick} />
                    <p>{name}</p>
                    <div />
                </div>

                <div className=' w-full py-4 bg-bgHeader px-[5%] -mb-1'>
                    <TextInput 
                        placeholder={name}
                        value={searchTerm} 
                        onChange={handleInputChange} 
                        icon={searchIcon}
                    />
                </div>

                <ul className="w-full bg-bgHeader flex flex-col shadow-lg max-h-[80%] overflow-auto ">
                    {filteredOptions.map((option) => (
                    <li
                        key={option.id}
                        className="flex w-full py-3 items-center justify-between text-start px-2 hover:bg-bgHeader cursor-pointer"
                        onClick={() => handleOptionClick(option)}
                    >
                        <Checkbox
                        checked={selectedOptions.some(selected => selected.id === option.id)}
                        onChange={() => {}} // Handle change is managed by the li onClicks
                        sx={{
                            color: 'var(--text-accent)',
                            '&.Mui-checked': {
                            color: 'var(--text-accent)',
                            },
                        }}
                        />
                        <span className="flex-grow">{option.description}</span>
                        <div/>
                    </li>
                    ))}
                </ul>

                <div className='w-full bg-bgPopUpHeaderFooter p-4 rounded-b-2xl flex item-center justify-center'>
                    <button 
                    onClick={handleIconClick}
                    className={`${ButtonStyles.addButton} w-28 self-center `} >
                        اعمال
                    </button>
                </div>

            </div>
        )}

      <div className={`flex flex-wrap items-center w-full ${selectedOptions.length > 0 && 'pt-4'} gap-y-4`}>
        {selectedOptions?.map((option, index) => (
          <div key={option.id} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center bg-bgOutputDefault shadow-lg'>
            <p className=' text-sm mx-1' >{index + 1}</p>
            <p className='text-sm px-6 w-full text-start'>{option.description}</p>
            <RemoveIcon sx={{background:  'var(--bg-output-default)',
            boxShadow: 'var(--shadow-all)',
            borderRadius:'0.5rem',
            color:'var(--text-error)'}}
            onClick={() => handleRemove(option)} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMultiplePopUp;


// Usage
  // <SearchMultipleSelect
    // options={syllabiData.data}
    // selectedOptions={selectedSyllabi}
    // handleSelectChange={handleSelectChangeSyllabi}
    // name="سیلابس ها"
    // handleRemove={handleRemoveSyllabi}
    // isForSyllabi={true}
  // />
