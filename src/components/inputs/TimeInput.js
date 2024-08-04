import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import clockIcon from '../../assets/icons/flightHour.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '2rem',
    borderRadius: '2xl',
    position: 'relative',
    display: 'flex',
  },
  icon: {
    position: 'absolute',
    width: '1.5rem',
    marginTop: '12px',
    marginRight: '8px',
    zIndex: 10,
    fill: 'white',
  },
  timePicker: {
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
  },
  textField: {
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
  },
}));

const TimeInput = ({ value, onChange, placeholder, icon }) => {
  const classes = useStyles();
  const [selectedTime, setSelectedTime] = useState(dayjs(value));

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <span>
        <img src={clockIcon} alt='icon' className={classes.icon} />
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
              className={classes.textField}
              label="گزینه‌ی‌زمان"
            />
          )}
          className={classes.timePicker}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;
