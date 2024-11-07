import React, { useState } from 'react';

// css styles 
import inputStyles from '../../../../styles/Inputs/Inputs.module.css'

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../../../components/icons/ThreeDCube'


const DropdownInputForEquipment = ({ options, selectedOption, handleSelectChange, name, icon, IsEmptyAfterSubmit }) => {

  const [filled, setFilled] = useState(false);

  const handleInputChange = (event) => {
    setFilled(event.target.value !== '');
  };

  return (
    <div className='flex relative w-[100%] h-12 rounded-xl'>

      <span className="absolute mt-3 mr-2 w-5">
        {icon ? 
          icon
          :
          <Cube />
        }
      </span>

      <select
        className={`${inputStyles.inputDropdown} ${filled && inputStyles.inputFilledBorder} ${IsEmptyAfterSubmit && inputStyles.inputEmptyAfterSubmitBorder} w-[100%] ${!selectedOption && 'text-textDisabled'}`}
        id="dropdown"
        value={selectedOption ? selectedOption.id : ''}
        onChange={(event) => {
          handleInputChange(event);
          const selected = options.find(option => option.id === parseInt(event.target.value));
          handleSelectChange(selected);
        }}
      >
        <option value="" className='w-full text-textDisabled' disabled>
          {name}
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id} className='text-textDefault'>
            {option.brand} - {option.model}
          </option>
        ))}
      </select>


      <span className=''> 
        <ArrowBackIosNewIcon sx={{ position: 'absolute', transform: 'rotate(-90deg)', margin: '0.8rem -2.2rem 0 0rem',  }} />
      </span>

    </div>
    
  );
};

export default DropdownInputForEquipment;

// <DropdownInput id={'ddi1'} name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={flightHour} handleSelectChange={handleFlightHourChange} />
