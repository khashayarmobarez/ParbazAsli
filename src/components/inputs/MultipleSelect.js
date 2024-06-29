import React from 'react';

// mui
import ClearIcon from '@mui/icons-material/Clear';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css'

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg'

const MultipleSelect = ({ options, selectedOptions, handleSelectChange, name, handleRemove }) => {

  const handleSelection = (e) => {
    const selectedValue = options.find(option => option.value === e.target.value);
    handleSelectChange([...selectedOptions, selectedValue]);
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex relative w-[100%] h-12 rounded-xl'>
        <span> 
          <img src={Cube} alt='icon' className=' absolute mt-3 mr-1 w-6' />
        </span>
        <select className={`${inputStyles.inputDropdown} w-[100%]`} id="dropdown" value="" onChange={handleSelection}>
          <option value="" >{name}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className=''> 
          <ArrowBackIosNewIcon sx={{ position: 'absolute', transform: 'rotate(-90deg)', margin: '0.8rem -2rem 0 0rem',  }} />
        </span>
      </div>

      <div className='flex items-center w-full py-0'>
        {selectedOptions.map(option => (
          <div key={option.value} className='p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center ml-2 mt-2'>
            <p className='text-sm mx-1'>{option.label}</p>
            <ClearIcon onClick={() => handleRemove(option)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelect;
