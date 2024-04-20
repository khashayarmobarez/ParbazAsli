import React, { useState } from 'react';

// css styles 
import inputStyles from '../../../styles/Inputs/Inputs.module.css'

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../../assets/icons/3dCube.svg'


const CitiesDropdownInput = ({ options, selectedOption, handleSelectChange, name, icon }) => {

  const [filled, setFilled] = useState(false);

  const handleInputChange = (event) => {
    setFilled(event.target.value !== '');
  };

  return (
    <div className='flex relative w-[100%] h-12 rounded-xl'>
      {icon ?
      <span> 
        <img src={icon} alt='icon' className=' absolute mt-3 mr-2 w-5' />
      </span>
      :
      <span> 
        <img src={Cube} alt='icon' className=' absolute mt-3 mr-2 w-6' />
      </span>
      }
      <select className={`${inputStyles.inputDropdown} ${filled && inputStyles.inputFilledBorder} w-[100%]`} id="dropdown" value={selectedOption} onChange={(event) => {handleInputChange(event);handleSelectChange(event);}} >
        <option value="" disabled>{name}</option>
        {options.map((city) => (
          <option key={city.cityId} value={city.cityName}>
            {city.provinceName} - {city.cityName}
          </option>
        ))}
      </select>
      <span className=''> 
        <ArrowBackIosNewIcon sx={{ position: 'absolute', transform: 'rotate(-90deg)', margin: '0.8rem -2rem 0 0rem',  }} />
      </span>
    </div>
    
  );
};

export default CitiesDropdownInput;

// <DropdownInput name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={flightHour} handleSelectChange={handleFlightHourChange} />
