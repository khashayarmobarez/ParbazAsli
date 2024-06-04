import React, { useEffect, useRef, useState } from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css';

const PhoneVerificationCode = ({ handleFinalSubmit ,showPopup, setShowPopup, callback, reset, isLoading, codeRemainingTime, code, setCode, errMsg }) => {

    const [ waitNotif, setWaitNotif ] = useState('')

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),   
    ];

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            ref.current.value = '';
        });
        inputRefs[0].current.focus();
        setCode('');
    };

    // useEffect(() => {
    //     if (code.length === 5) {
    //         if (typeof callback === 'function') callback(code);
    //         resetCode();
    //     }
    // }, [code]);

    // useEffect(() => {
    //     resetCode();
    // }, [reset]); 

    function handleInput(e, index) {
        const input = e.target;
        const newCode = [...code];

        // Only allow numbers
        if (/^[0-9]$/.test(input.value)) {
            newCode[index] = input.value;
            inputRefs[index].current.value = input.value;
        } else {
            // Clear the input if it's not a number
            input.value = '';
        }
        
        setCode(newCode.join(''));

        if (input.value !== '') {
            // Select next input on entry, if exists
            const nextInput = inputRefs[index + 1];
            if (nextInput) {
                nextInput.current.focus();
            }
        }
    }

    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
    }

    // Handle backspace key
    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => {
                const newCode = prevCode.split('');
                newCode[index] = '';
                return newCode.join('');
            });
            if (previousInput) {
                previousInput.current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 4 && /^[0-9]+$/.test(pastedCode)) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };

    // Clear button deletes all inputs and selects the first input for entry
    const ClearButton = () => {
        return (
            <button
                onClick={resetCode}
                className="text-2xl absolute right-[-30px] top-3"
            >
                <CloseIcon />
            </button>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFinalSubmit()
        setWaitNotif(true)
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${showPopup ? 'visible' : 'invisible'}`}>
            <form
                className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[304px] h-[280px] flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg`}
            >
                <CloseIcon
                    onClick={() => setShowPopup(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />
                <h3 className="text-[#ED553B] text-xl">تاییدیه</h3>
                <div dir="ltr" className="w-full flex justify-center gap-5 relative mt-2">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            style={{ border: 'none', borderBottom: '2px var(--yellow-text) solid' }}
                            className="text-2xl rounded-none bg-none shadow-none w-10 flex p-2 text-center"
                            key={index}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, index)}
                            ref={inputRefs[index]}
                            autoFocus={index === 0}
                            onFocus={handleFocus}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            disabled={isLoading}
                        />
                    ))}
                </div>
                {code.length ? <div className='w-5 h-5'><ClearButton className='relative' /></div> : null}
                <button  className={`${ButtonStyles.addButton} w-32`} onClick={handleSubmit}>ارسال</button>
                <p className={codeRemainingTime ? "errmsg" : "offscreen"} aria-live="assertive">اگر کد را دریافت نکردین برای دریافت دوباره ی کد لطفا {codeRemainingTime} صبر کتید</p>
                <p className={waitNotif ? "errmsg" : "offscreen"} aria-live="assertive"> صبر کتید اطلاعات در حال بارگذاری می باشد</p>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>

            </form>
        </div>
    );
};

export default PhoneVerificationCode;
