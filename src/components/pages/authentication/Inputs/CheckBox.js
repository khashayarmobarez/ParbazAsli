import React from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const Checkbox = ({ label, isChecked, onToggle, openTerms }) => {
  const toggleCheckbox = () => {
    onToggle(!isChecked); // Pass the new checked state to the parent component
  };

  return (
    <div className=' flex px-2 gap-x-4 items-center'  onClick={toggleCheckbox}>
      <div className={`w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer`} style={{borderColor:'var(--yellow-text )'}}>
        {isChecked && < CheckRoundedIcon />}
      </div>
      <div className=" underline underline-offset-4 cursor-pointer" onClick={{}}>{label}</div>
    </div>
  );
};

export default Checkbox;
