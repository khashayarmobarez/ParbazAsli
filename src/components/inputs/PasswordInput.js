import React, { useState } from 'react';

// styles
import inputStyles from '../../styles/Inputs/Inputs.module.css'

// assets
import keyIcon from '../../assets/icons/key-Icon.svg'

// mui
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const PasswordInput = ({placeHolder, value, onChange}) => {

  // State to manage whether the password is visible or not
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input flex relative w-[100%] h-12 px-2 rounded-2xl">
      <span style={{color:'var(--disabled-button-text)'}}> 
          <img src={keyIcon} alt='icon' className=' absolute mt-4 mr-2'/>
      </span>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className={`${inputStyles.passwordInput} w-[100%] text-sm font-sm`}
        placeholder={placeHolder}
      />
      {/* <button>Show/Hide Password</button> */}
      <span onClick={togglePasswordVisibility} style={{color:'#cacaca'}}> 
      {
      showPassword ? 
      <RemoveRedEyeOutlinedIcon sx={{position:'absolute', top:'0.8rem', left: '1rem'}} />
      : <VisibilityOffOutlinedIcon sx={{position:'absolute', top:'0.8rem', left: '1rem'}}/>
      }
            {/* <img src={showPassword ? eyePass : eyePass} alt='icon' className=' absolute top-[1.1rem] left-5'/> */}
      </span>
    </div>
  );
};

export default PasswordInput;