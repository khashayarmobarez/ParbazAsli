import React, { useState } from 'react';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'
import boxStyle from '../../../../styles/Boxes/DataBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// components
import TextInput from '../../../inputs/textInput';

const ChangeCoach = () => {

    const [showPopup, setShowPopup] = useState(false);

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform any action with the input value, such as submitting it to a backend or processing it in some way
        console.log('Submitted value:', inputValue);
        // Clear the input field after submission
        setInputValue('');
    };

    return (
            <div className='w-[90%] mt-4 flex flex-col items-center px-3 text-sm gap-y-6' style={{color:'var(--soft-white)'}}>
                <div className='flex w-full justify-between items-center'>
                    <p>مربی : محمود شیرازی‌نیا</p>
                    <p>کد کاربری : 22354678987</p>
                </div>
                <TextInput placeholder={'شماره کاربری مربی جدید'} Type={'number'}/>

                <button type='submit' onClick={() => setShowPopup(true)} className={`${ButtonStyles.addButton} w-36`}>ثبت </button>

                {/* pop up */}
            <form onSubmit={handleSubmit} className={` ${boxStyle.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}   w-[304px] h-[280px] flex flex-col justify-around items-center md:z-[50]`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>

                <h3 className=' text-lg  '>در صورت زدن دکمه ارسال درخواست تایید برای مربی جدید و اعلان غیر فعال شدن هنرجو برای مربی کنونی ارسال می‌گردد</h3>

                <button type="submit" className={`${ButtonStyles.addButton} w-32`} onClick={() => setShowPopup(false)}>ارسال</button>

                </form>

            </div>
    );
};

export default ChangeCoach;