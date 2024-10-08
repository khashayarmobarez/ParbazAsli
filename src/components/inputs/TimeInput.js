import React, { useState } from 'react';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalStyles, TextField } from '@mui/material';
import dayjs from 'dayjs';
import clockIcon from '../../assets/icons/flightHour.svg';



const TimeInput = ({ value, onChange, placeholder, icon }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(value));

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onChange(newValue);
  };

  return (
    <div className={`w-full min-h-8 rounded-2xl relative flex`}>

      {/* Global Styles to Force LTR for Picker Dialog */}
      <GlobalStyles styles={{
        '.MuiPaper-root': {
          direction: 'ltr', // Ensure dialog is LTR
        },
      }} />

      <span>
        <img src={clockIcon} alt='icon' className={`absolute w-6 mt-3 mr-2 z-10`} />
      </span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          ampm={false}
          value={selectedTime}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                placeholder: placeholder || "hh:mm",
              }}
              sx={{
                  width: '100%',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                  },
              }}
              label="گزینه‌ی‌زمان"
            />
          )}
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
              border: '1px solid rgba(255, 255, 255, 0.5)',
              '&:hover': {
                background: 'none',
              },
              '&.Mui-focused': {
                background: 'none',
                boxShadow: 'none',
                border: '1px solid var(--low-opacity-white)',
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;
