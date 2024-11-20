import React, { useEffect, useMemo, useRef, useState } from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css';

const PhoneVerificationCode = ({ handleFinalSubmit ,showPopup, setShowPopup, callback, reset, isLoading, codeRemainingTime, code, setCode, errMsg, codeLength, handleResendCode, isForEmail }) => {


    // Create an array of refs based on codeLength from api
    const inputRefs = useRef(Array.from({ length: codeLength }, () => React.createRef()));

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.current.forEach(ref => {
            if (ref.current) ref.current.value = '';
        });
        if (inputRefs.current[0]?.current) inputRefs.current[0].current.focus();
        setCode('');
    };

    const handleInput = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode.join(''));  // Join the array elements into a string before setting the state

        // Move focus to the next input if available
        if (e.target.value && index < codeLength - 1) {
            inputRefs.current[index + 1].current.focus();   
        }
    };

    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
    }

     // Handle backspace key
     const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (!code[index] && index > 0) {
                inputRefs.current[index - 1].current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = async(e) => {
        e.preventDefault();
        
        const pasteData = e.clipboardData.getData('text').slice(0, codeLength);  // Ensure only codeLength number of characters
        const newCode = [...code];
        
        // Distribute the pasted characters across the inputs
        pasteData.split('').forEach((char, i) => {
            if (i < codeLength) {
                newCode[i] = char;
                inputRefs.current[i].current.value = char;  // Set the value of each input
            }
        });
    
        setCode(newCode.join(''));
    
        // Focus the next empty input if available
        const nextIndex = pasteData.length < codeLength ? pasteData.length : codeLength - 1;
        if (inputRefs.current[nextIndex]?.current) {
            inputRefs.current[nextIndex].current.focus();
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
    }

    useEffect(() => {
        if (inputRefs.current[0]?.current) {
            inputRefs.current[0].current.focus();
        }
    }, [inputRefs]);

    return (
        <div className={` w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[100] ${showPopup ? 'visible' : 'invisible'}`}>
            <form
                className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[454px] h-auto flex flex-col justify-around items-center relative bg-white p-5 pt-8 rounded-lg shadow-lg`}
            >
                <CloseIcon
                    onClick={() => setShowPopup(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />
                <h3 className="text-textAccent text-xl">کد تایید ارسال شده را وارد کنید</h3>
                <div dir="ltr" className="w-full flex justify-center gap-5 relative my-6">
                    {inputRefs.current.map((ref, index) => (
                        <input
                            style={{ border: 'none', borderBottom: '2px var(--text-default) solid ', background: 'transparent'}}
                            className={`text-2xl rounded-none shadow-none w-10 flex p-2 text-center border`}
                            key={index}
                            type="text"
                            autocomplete="one-time-code"
                            maxLength={1}
                            onChange={(e) => handleInput(e, index)}
                            ref={ref}
                            autoFocus={index === 0}
                            onFocus={handleFocus}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                {
                    isForEmail &&
                    <p className='mt-6 text-xs text-textWarning'>در صورتی که کد تایید برای شما ارسال نشده‌ است، پوشه هرزنامه (Spam) خود را بررسی نمایید.</p>
                }

                {
                    codeRemainingTime < 1 &&
                        <p onClick={handleResendCode} className="text-textAccent mt-6" aria-live="assertive">ارسال مجدد</p>
                }

                {code.length ? <div className='w-5 h-5'><ClearButton className='relative' /></div> : null}
                <p className={codeRemainingTime ? "text-textAccent font-semibold" : "hidden"} aria-live="assertive">در صورت عدم دریافت کد {codeRemainingTime} ثانیه صبر کنید</p>
                <p className={isLoading ? "text-textAccent mt-1" : "hidden"} aria-live="assertive">  ... صبر کنید اطلاعات در حال بارگذاری می باشد</p>
                <p className={errMsg ? "text-sm text-textError" : "hidden"} aria-live="assertive"> {errMsg}</p>
                
                <button disabled={isLoading} className={`${ButtonStyles.addButton} ${isLoading && 'opacity-45'} w-32 mt-6 mb-4`} onClick={handleSubmit}>ثبت</button>

            </form>
        </div>
    );
};

export default PhoneVerificationCode;
