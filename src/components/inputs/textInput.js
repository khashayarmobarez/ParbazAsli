import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css'

const TextInput = ({ value, onChange, placeholder, Type, icon }) => {
  return (
    <div className='flex relative w-[100%] h-12 rounded-xl'>
      <span> 
        { icon ?
          <img src={icon} alt='icon' className=' absolute w-5 mt-[12px] mr-[6px]' style={{fill :'white'}} />
          : <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          }
      </span>
      <input type={Type} id="aircraft" placeholder={placeholder} onChange={onChange} className={`${inputStyles.inputText2} w-[100%] pr-8`} />
    </div>
  ); 
};

export default TextInput;

//  <TextInput value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' />