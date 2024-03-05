import React from 'react';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css'

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg'


const DropdownInput = ({ options, selectedOption, handleSelectChange, name }) => {

  return (
    <div className='flex relative w-[100%] h-12 rounded-xl'>
      <span> 
        <img src={Cube} alt='icon' className=' absolute mt-3 mr-1 w-6' />
      </span>
      <select className={`${inputStyles.inputDropdown} w-[100%]`} id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled>{name}</option>
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
    
  );
};

export default DropdownInput;

// <DropdownInput name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={flightHour} handleSelectChange={handleFlightHourChange} />
