import React, { useState } from 'react';

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

// assets
import clockIcon from '../../assets/icons/flightHour.svg';

const TimeInput = ({ value, onChange, placeholder, icon }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(value));

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onChange(newValue);
  };

  return (
    <div className='flex relative w-full min-h-8 rounded-2xl'>
      <span>
          <img src={clockIcon} alt='icon' className='absolute w-6 mt-[12px] mr-[8px] z-10' style={{ fill: 'white' }} />
      </span>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <MobileTimePicker
          sx={{
            width: '100%',
            height: '3rem',
            background: 'linear-gradient(0deg, #181A2D, #181A2D), linear-gradient(215.85deg, rgba(238, 238, 238, 0.46) -45.31%, rgba(238, 238, 238, 0) 168.95%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '-3px 4px 4px 1px rgba(0, 0, 0, 0.32)',
            appearance: 'none',
            borderRadius: '0.75rem',
            '& .MuiInputBase-input': {
                color: 'var(--softer-white)',
              },
            '& .MuiInputBase-root': {
              paddingRight: '2.5rem',
              borderRadius: '0.75rem',
              height: '3rem',
              border:'1px solid rgba(255, 255, 255, 0.5)',
              '&:hover': {
                background: 'none', // Disable hover background change
              },
              '&.Mui-focused': {
                background: 'none', // Disable focus background change
                boxShadow: 'none', // Disable focus shadow
                border: '1px solid var(--low-opacity-white)', // Ensure border remains the same
              },
            },
          }}
          ampm={false}
          value={selectedTime}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField 
              {...params}
              variant="standard"
              
              // Directly setting the placeholder here
              InputProps={{
                ...params.InputProps,
                placeholder:"hdsdsh:mm",// Override the default placeholder
              }}
              sx={{
                width: '100%',
                '.MuiInput-underline:before': {
                  borderBottomColor: 'rgba(255, 255, 255, 0.7)', // Customizing underline color
                },
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)', // Customizing placeholder text color
                    opacity: 1, // Ensuring placeholder is fully visible
                  },
                },
              }}
              label="گزینه‌ی‌زمان"
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;