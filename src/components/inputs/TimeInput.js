import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const TimeInput = ({ value, onChange, placeholder, icon }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(value));

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onChange(newValue);
  };

  return (
    <div className='flex relative w-full min-h-12 rounded-2xl'>
      {/* <span>
        {icon ? (
          <img src={icon} alt='icon' className='absolute w-6 mt-[12px] mr-[8px]' style={{ fill: 'white' }} />
        ) : (
          <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
        )}
      </span> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          sx={{
            width: '100%',
            color: '#fff',
            background: 'linear-gradient(0deg, #181A2D, #181A2D), linear-gradient(215.85deg, rgba(238, 238, 238, 0.46) -45.31%, rgba(238, 238, 238, 0) 168.95%)',
            border: '1px solid var(--input-border)',
            boxShadow: '-3px 4px 4px 1px rgba(0, 0, 0, 0.32)',
            appearance: 'none',
            borderRadius: '0.75rem',
            '&::placeholder': {
              color: '#fff',
            },  
          }}
          ampm={false}
          value={selectedTime}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField 
              {...params} 
              variant='standard' 
              placeholder={placeholder} 
              sx={{ width: '100%', color:'#fff', }} // Corrected typo in color property
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;