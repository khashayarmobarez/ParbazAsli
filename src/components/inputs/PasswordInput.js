import React, { useState } from 'react';

// styles
import inputStyles from '../../styles/Inputs/Inputs.module.css'

// assets
import keyIcon from '../../assets/icons/key-Icon.svg'

const PasswordInput = ({placeHolder}) => {

  // State to manage the value of the password input field
  const [password, setPassword] = useState('');

  // Function to handle changes to the password input field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="password-input flex relative w-[100%] h-12 px-2">
        <span style={{color:'var(--disabled-button-text)'}}> 
            <img src={keyIcon} alt='icon' className=' absolute mt-4 mr-2'/>
        </span>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className={`${inputStyles.passwordInput} w-[100%] text-sm font-sm`}
        placeholder={placeHolder}
      />
      {/* <button>Show/Hide Password</button> */}
    </div>
  );
};

export default PasswordInput;