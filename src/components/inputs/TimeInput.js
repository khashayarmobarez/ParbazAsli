import React, { useEffect, useState } from 'react';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalStyles, InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimeInput = ({ value, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs(value));

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    console.log(selectedTime.$D);
  }, [selectedTime]);

  const CustomInput = React.forwardRef((props, ref) => {
    const { inputProps, InputProps, ...other } = props;

    return (
      <div ref={ref} className="custom-time-input">
        <input
          {...inputProps}
          {...other}
          placeholder="زمان"
          style={{
            width: '100%',
            height: '3rem',
            padding: '0.5rem 2.5rem 0.5rem 0.5rem',
            border: '1px solid var(--border-input-default)',
            borderRadius: '0.75rem',
            background: 'none',
            color: selectedTime.$D ? 'var(--text-default)' : 'var(--text-disabled)',  
            fontSize: '14px',
          }}
        />
        <InputAdornment position="start" style={{ position: 'absolute', right: '0.1rem', top: '50%', transform: 'translateY(-50%)' }}>
          <AccessTimeIcon sx={{color:'var(--text-default)'}} />
        </InputAdornment>
      </div>
    );
  });

  return (
    <div className="w-full min-h-8 rounded-2xl relative">
      <GlobalStyles styles={{
        '.MuiPaper-root': {
          direction: 'ltr',
        },
      }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          ampm={false}
          value={selectedTime.$D ? 'زمان' : selectedTime}
          onChange={handleTimeChange}
          components={{
            TextField: CustomInput,
          }}
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              '&.Mui-error': {
                '& .custom-time-input input': {
                  borderColor: 'var(--border-input-default)',
                },
              },
              '&:hover': {
                background: 'none',
              },
              '&.Mui-focused': {
                background: 'none',
                boxShadow: 'none',
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;