    import React, { useState, useEffect } from 'react';

    // redux
    import { useSelector } from 'react-redux';
    import { selectAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

    // mui
    import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
    import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

    // assets 
    import KeyIcon from '../../../components/icons/KeyIcon';
    import inputStyles from '../../../styles/Inputs/Inputs.module.css';

    const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;

    const PasswordInputSignup = ({ onChange, value, focus, onFocus, onBlur, isSubmitted, customActivePlaceHolderBgColor }) => {

      const authSettings = useSelector(selectAuthSettings);

      const [validPwd, setValidPwd] = useState(false);
      const [showPassword, setShowPassword] = useState(false);  
      const [filled, setFilled] = useState(false);
      const [inputFocus, setInputFocus] = useState(false);
      const [errorsAccurred, setErrorsAccurred] = useState([]);
      const [showErrors, setShowErrors] = useState(false);

      // Separate states for different elements
      const [iconColor, setIconColor] = useState('var(--text-default)');
      const [borderColorClass, setBorderColorClass] = useState('');
      const [labelColor, setLabelColor] = useState('var(--text-input-default)');
      const [textErrorColor, setTextErrorColor] = useState('var(--text-error)');

      const ErrorConditionMet = (value && !validPwd && filled) || (!value && isSubmitted);
      

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

          validPwd && setErrorsAccurred([]);
          value && setErrorsAccurred(errorsAccurred.filter((error) => error !== 'errorEmpty'));
        }, 1000);

        if(!value && isSubmitted) {
          setIconColor('var(--text-error)');
          setLabelColor('var(--text-error)');
          setIconColor('var(--text-error)');
          setBorderColorClass(inputStyles.inputErrorBorder);
          setShowErrors(true);
        }

        return () => clearInterval(interval);
      }, [
        value, 
        isSubmitted,
        passwordMinLength, 
        passwordMaxLength, 
        passwordRequireNonAlphanumeric, 
        passwordRequireDigit, 
        passwordRequireUppercase, 
        passwordRequireLowercase
      ]);

      const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange(e); // External onChange handler
        setFilled(inputValue.trim() !== '');
        
        // Validate directly in onChange to ensure immediate updates
        const isValid = 
          inputValue.length >= passwordMinLength &&
          inputValue.length <= passwordMaxLength &&
          (!passwordRequireNonAlphanumeric || /[^\w\s]/.test(inputValue)) &&
          (!passwordRequireDigit || /\d/.test(inputValue)) &&
          (!passwordRequireUppercase || /[A-Z]/.test(inputValue)) &&
          (!passwordRequireLowercase || /[a-z]/.test(inputValue)) &&
          PWD_REGEX.test(inputValue);
      
        setValidPwd(isValid);
      };
  

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


      const handleLabelClick = () => {
        document.getElementById('passwordSignup').focus();
      };
    
      const handleFocus = () => {
        setInputFocus(true);
        updateColors(true, validPwd, filled);
        onFocus();
      };
    
      const handleBlur = () => {
        setInputFocus(false);
        updateColors(false, validPwd, filled);
        setShowErrors(true);
        onBlur();
      };
    
      const updateColors = (isFocused, isValid, isFilled) => {
        if (isFocused) {
          setIconColor('var(--text-input-selected)');
          setBorderColorClass(inputStyles.inputSelectedBorder);
          setLabelColor('var(--text-input-selected)');
          setTextErrorColor('var(--text-input-selected)');
        } else if (isValid && isFilled) {
          setIconColor('var(--text-accent)');
          setBorderColorClass(inputStyles.inputValidBorder);
          setLabelColor('var(--text-accent)');
          setTextErrorColor('var(--text-error)');
        } else if (!isValid && isFilled) {  // New condition for invalid input when filled
          setIconColor('var(--text-error)');
          setBorderColorClass(inputStyles.inputErrorBorder);
          setLabelColor('var(--text-error)');
          setTextErrorColor('var(--text-error)');
        } else if (ErrorConditionMet || (!isFilled && isSubmitted)) {
          setIconColor('var(--text-error)');
          setBorderColorClass(inputStyles.inputErrorBorder);
          setLabelColor('var(--text-error)');
          setTextErrorColor('var(--text-error)');
        } else {
          setIconColor('var(--text-error)');
          setBorderColorClass(inputStyles.inputErrorBorder);
          setLabelColor('var(--text-error)');
          setTextErrorColor('var(--text-error)');
        }
      };

      return (
        <>
          <div className={`${inputStyles['password-input']} flex relative w-[100%] h-12 px-2`} htmlFor="password">
          <span className="absolute right-6 top-3 w-5 z-10 cursor-text"  >
            <KeyIcon customColor={iconColor} />
          </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="passwordSignup"
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`
                peer w-full min-h-12 px-4 pt-1 pb-1 pr-10 rounded-2xl
                border-2 bg-transparent
                text-gray-900 placeholder-transparent
                focus:outline-none
                ${borderColorClass}
                ${inputStyles.inputText2}
                ${ErrorConditionMet ? inputStyles.inputText2Error : inputStyles.inputText2}
              `}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              placeholder=" "
              autoComplete="new-password" 
            />

            <label
              onClick={handleLabelClick}
              htmlFor="username"
              className={`
                absolute right-14 top-[13px]
                transition-all duration-300 transform
                peer-placeholder-shown:translate-y-0
                peer-placeholder-shown:text-sm
                peer-focus:-translate-y-5 peer-focus:text-xs cursor-text
                text-[${labelColor}]
                ${(inputFocus || filled) ? `-translate-y-5 translate-x-2 text-xs ${customActivePlaceHolderBgColor || 'bg-bgPageMain'} px-2 rounded ` : 'text-base'}
              `}
            >
              رمز عبور
            </label>

            <span 
            onClick={togglePasswordVisibility} 
            className="absolute left-5 top-3 cursor-pointer"
            style={{ color: iconColor }}
            >
                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
            </span>
          </div>

          <div id="pwdnote" className={`${filled && !validPwd ? "instructions" : "hidden"} -mt-2 text-right text-xs mr-6 text-[${textErrorColor}] gap-y-2 flex flex-col items-start w-full `}>
            {
              (value.length < passwordMinLength || value.length > passwordMaxLength ) &&
                <p>
                  *پسوورد باید حداقل {passwordMinLength} و حداکثر {passwordMaxLength} کارکتر داشته باشد.<br />
                </p>
            }
            {  passwordRequireDigit && !(/\d/.test(value)) &&
              (
                <p>
                  *رمز عبور باید حداقل شامل یک عدد باشد
                  <br />
                </p>
              ) 
            }
            {  passwordRequireUppercase && !(/[A-Z]/.test(value)) && (
              <p>
                *رمز عبور باید حداقل شامل یک حرف بزرگ باشد
                <br />
              </p>
              ) }
            {  passwordRequireLowercase && !(/[a-z]/.test(value)) && (
              <p>
                *رمز عبور باید حداقل شامل یک حرف کوچک باشد
                <br />
              </p>
            ) }
            {  passwordRequireNonAlphanumeric && !(/[^\w\s]/.test(value)) && (
              <p>
                *رمز عبور باید حداقل شامل یک کارکتر ویژه باشد
                <br />
              </p>
              )  }
          </div>

          <p id="inputnote" aria-live="polite" className={`${(!value && showErrors ) ? "instructions" : "hidden"} -mt-2 text-right text-xs mr-4 self-start text-textError`}>
            *رمز عبور الزامی می باشد
          </p>
        </>
      );
    };

    export default PasswordInputSignup;