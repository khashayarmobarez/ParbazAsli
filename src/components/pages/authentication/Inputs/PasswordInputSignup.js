    import React, { useState, useEffect } from 'react';

    // redux
    import { useSelector } from 'react-redux';
    import { selectAuthSettings } from '../../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

    // mui
    import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
    import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
    import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

    // assets 
    import keyIcon from '../../../../assets/icons/key-Icon.svg';
    import inputStyles from '../../../../styles/Inputs/Inputs.module.css';

    const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;

    const PasswordInputSignup = ({ onChange, value, focus, onFocus, onBlur }) => {

      const authSettings = useSelector(selectAuthSettings);

      const [pwdFocus, setPwdFocus] = useState(false);
      const [validPwd, setValidPwd] = useState(false);
      const [showPassword, setShowPassword] = useState(false);  
      const [filled, setFilled] = useState(false);

      const {
        passwordMinLength,
        passwordMaxLength,
        passwordRequireNonAlphanumeric,
        passwordRequireDigit,
        passwordRequireUppercase,
        passwordRequireLowercase,
      } = authSettings.settings;
      
      useEffect(() => {
        const interval = setInterval(() => {
          const isValid =
            value.length >= passwordMinLength &&
            value.length <= passwordMaxLength &&
            (!passwordRequireNonAlphanumeric || /[^\w\s]/.test(value)) &&
            (!passwordRequireDigit || /\d/.test(value)) &&
            (!passwordRequireUppercase || /[A-Z]/.test(value)) &&
            (!passwordRequireLowercase || /[a-z]/.test(value)) &&
            PWD_REGEX.test(value);

          setValidPwd(isValid);
          setFilled(value.trim() !== '');
        }, 1000);

        return () => clearInterval(interval);
      }, [
        value, 
        passwordMinLength, 
        passwordMaxLength, 
        passwordRequireNonAlphanumeric, 
        passwordRequireDigit, 
        passwordRequireUppercase, 
        passwordRequireLowercase
      ]);
    


      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      return (
        <>
          <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12 px-2`} htmlFor="password">
            <span style={{ color: 'var(--disabled-button-text)' }}>
              <img src={keyIcon} alt="icon" className="absolute mt-4 mr-2" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={value}
              onChange={(e) => {
                onChange(e); // Call the first function
                setFilled(e.target.value.trim() !== ''); // Update filled state
                setValidPwd(PWD_REGEX.test(e.target.value)); // Update validPwd state
              }}
              className={`${inputStyles.inputText2} ${filled && inputStyles.inputFilledBorder} w-[100%] pr-8`}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => {
                setPwdFocus(true);
                onFocus();
              }}
              onBlur={() => {
                setPwdFocus(false);
                onBlur();
              }}
              placeholder="رمز عبور جدید"
              autoComplete="new-password" 
            />
            <span onClick={togglePasswordVisibility} style={{ color: '#cacaca' }}>
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
              ) : (
                <VisibilityOffOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
              )}
            </span>
          </div>
          <p id="pwdnote" className={`${filled && !validPwd ? "instructions" : "hidden"} self-start text-start`}
          style={{color:'var(--notification-red)'}}>
            {
              (value.length < passwordMinLength || value.length > passwordMaxLength ) &&
                <>
                  <InfoOutlinedIcon sx={{marginLeft:'5px'}} />
                  پسوورد باید حداقل {passwordMinLength} و حداکثر {passwordMaxLength} کارکتر داشته باشد.<br />
                </>
            }
            {  passwordRequireDigit && !(/\d/.test(value)) &&
              (
                <>
                  <InfoOutlinedIcon sx={{marginLeft:'5px'}} />
                  رمز عبور باید حداقل شامل یک عدد باشد
                  <br />
                </>
              ) 
            }
            {  passwordRequireUppercase && !(/[A-Z]/.test(value)) && (
              <>
                <InfoOutlinedIcon sx={{marginLeft:'5px'}} />
                رمز عبور باید حداقل شامل یک حرف بزرگ باشد
                <br />
              </>
              ) }
            {  passwordRequireLowercase && !(/[a-z]/.test(value)) && (
              <>
                <InfoOutlinedIcon sx={{marginLeft:'5px'}} />
                رمز عبور باید حداقل شامل یک حرف کوچک باشد
                <br />
              </>
            ) }
            {  passwordRequireNonAlphanumeric && !(/[^\w\s]/.test(value)) && (
              <>
                <InfoOutlinedIcon sx={{marginLeft:'5px'}} />
                رمز عبور باید حداقل شامل یک کارکتر ویژه باشد
                <br />
              </>
              )  }
          </p>
        </>
      );
    };

    export default PasswordInputSignup;