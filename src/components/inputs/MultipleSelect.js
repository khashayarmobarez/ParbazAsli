import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../assets/icons/3dCube.svg';
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const MultipleSelect = ({ options, selectedOptions , handleSelectChange, name, handleRemove }) => {
  const handleSelection = (e) => {
    const selectedValue = options.find(option => option.id.toString() === e.target.value);
    if (selectedValue && !selectedOptions.some(option => option.id === selectedValue.id)) {
      handleSelectChange([...selectedOptions, selectedValue]);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex relative w-[100%] h-12 rounded-xl'>
        <span>
          <img src={Cube} alt='icon' className='absolute mt-3 mr-1 w-6' />
        </span>
        <select className={`${inputStyles.inputDropdown} w-[100%]`} id="dropdown" value="" onChange={handleSelection}>
          <option value="">{name}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id.toString()}>
              {option.description}  - {option.type === 'Theory' && 'تئوری'}{option.type === 'Practical' && 'عملی'}
            </option>
          ))}
        </select>
        <span className=''>
          <ArrowBackIosNewIcon sx={{ position: 'absolute', transform: 'rotate(-90deg)', margin: '0.8rem -2rem 0 0rem', }} />
        </span>
      </div>

      <div className='flex flex-wrap items-center w-full py-0'>
        {selectedOptions?.map(option => (
          <div key={option.id} className='p-1 w-full bg-[#282C4C] rounded-xl flex justify-between items-center mt-2'>
            <p className='text-sm mx-1'>{option.description} - {option.type === 'Theory' && 'تئوری'}{option.type === 'Practical' && 'عملی'}</p>
            <ClearIcon onClick={() => handleRemove(option)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelect;

// Usage


// const handleSelectChangeSyllabi = (newSelectedOptions) => {
//   setSelectedSyllabi(newSelectedOptions);
//   setSyllabusIds(newSelectedOptions.map(option => option.id));
// };

// const handleRemoveSyllabi = (dataToRemove) => {
  //   setSelectedSyllabi(selectedSyllabi.filter(data => data.id !== dataToRemove.id));
  //   setSyllabusIds(prev => prev.filter(id => id !== dataToRemove.id));
// };

{/* <MultipleSelect
  name={'سیلابس ها'}
  options={syllabiData.data}
  selectedOptions={selectedSyllabi}
  handleSelectChange={handleSelectChangeSyllabi}
  handleRemove={handleRemoveSyllabi}
/> */}