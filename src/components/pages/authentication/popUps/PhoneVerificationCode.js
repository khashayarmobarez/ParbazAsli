import React, { useEffect, useMemo, useRef, useState } from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css';

const PhoneVerificationCode = ({ handleFinalSubmit ,showPopup, setShowPopup, callback, reset, isLoading, codeRemainingTime, code, setCode, errMsg, codeLength }) => {

    const [ waitNotif, setWaitNotif ] = useState('')

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
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').slice(0, codeLength);
        const newCode = pasteData.split('').map((char, i) => pasteData[i] || code[i]);
        setCode(newCode.join(''));  // Join the array elements into a string before setting the state

        // Move focus to the appropriate input
        const nextIndex = Math.min(newCode.length, codeLength - 1);
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
        setWaitNotif(true)
    }

    useEffect(() => {
        if (inputRefs.current[0]?.current) {
            inputRefs.current[0].current.focus();
        }
    }, [inputRefs]);

    return (
        <div className={` w-full fixed inset-0 flex items-center justify-center ${showPopup ? 'visible' : 'invisible'}`}>
            <form
                className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[454px] h-[280px] flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg`}
            >
                <CloseIcon
                    onClick={() => setShowPopup(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />
                <h3 className="text-[#ED553B] text-xl">تاییدیه</h3>
                <div dir="ltr" className="w-full flex justify-center gap-5 relative mt-2">
                    {inputRefs.current.map((ref, index) => (
                        <input
                            style={{ border: 'none', borderBottom: '2px var(--yellow-text) solid ', background: 'transparent'}}
                            className="text-2xl rounded-none shadow-none w-10 flex p-2 text-center border"
                            key={index}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleInput(e, index)}
                            ref={ref}
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
                <p className={codeRemainingTime ? "text-light-yellow" : "hidden"} aria-live="assertive">اگر کد را دریافت نکردین برای دریافت دوباره ی کد لطفا {codeRemainingTime} ثانیه صبر کتید</p>
                <p className={waitNotif ? "text-light-yellow mt-1" : "hidden"} aria-live="assertive">  ... صبر کتید اطلاعات در حال بارگذاری می باشد</p>
                <p className={errMsg ? "text-sm text-[#ED553B]" : "hidden"} aria-live="assertive"> {errMsg}</p>

            </form>
        </div>
    );
};

export default PhoneVerificationCode;
