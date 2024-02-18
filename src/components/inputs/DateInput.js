import React from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// css styles 
import inputStyles from '../../styles/Inputs/Inputs.module.css';

const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <div className={`${inputStyles.dateContainer} w-[100%] h-12`}>
      <span> 
        <CalendarTodayOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
      </span>
      <input type="date" className={`${inputStyles.customDateInput} `} />
    </div>
  );
};

export default TextInput;
