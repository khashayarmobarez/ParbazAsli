import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css'

const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <div className='flex relative w-[100%] h-12 rounded-xl'>
      <span> 
        <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
      </span>
      <input type="text" id="aircraft" value={value} placeholder={placeholder} onChange={onChange} className={`${inputStyles.inputText2} w-[100%]`} />
    </div>
  );
};

export default TextInput;

//  <TextInput value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />