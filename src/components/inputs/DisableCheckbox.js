import React, { useState, useEffect } from 'react';

// mui
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const DisableCheckbox = ({ initialValue }) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  useEffect(() => {
    // Here you can fetch data from the API to determine the initial state
    // For demonstration, let's assume initialValue is received from props
    setIsChecked(initialValue);
  }, [initialValue]);

  const handleChange = () => {
    // This function prevents the user from changing the state
    // but you can still update the state programmatically
    // if needed based on API data
    // For demonstration, we don't perform any action here
  };

  return (
    <>
    <div
      className=' rounded w-5 h-5 flex justify-center items-center'
      style={{
        border: '2px solid var(--yellow-border-button)',
        boxShadow: '1px -1px 2.5px 0px rgba(235, 224, 224, 0.51)',
      }}>
        {isChecked && 
        <CheckOutlinedIcon sx={{width: '1rem', color:'yellow' }} />
        }
      </div>
    </>
  );
};

export default DisableCheckbox;
