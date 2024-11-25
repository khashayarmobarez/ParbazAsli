import React from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from 'react-router-dom';

const Checkbox = ({ label, isChecked, onToggle, openTerms, noLabel }) => {

  const toggleCheckbox = () => {
    onToggle(!isChecked); // Pass the new checked state to the parent component
  };

  return (
    <div className=' flex px-2 gap-x-4 items-center'  onClick={toggleCheckbox}>
      <div className={`w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer`} style={{borderColor:'var(--text-accent)'}}>
        {isChecked && < CheckRoundedIcon sx={{color: 'var(--text-accent)'}} />}
      </div>
      {
        !noLabel &&
        <div className=" cursor-pointer" >{label}</div>
      }
    </div>
  );
};

export default Checkbox;
