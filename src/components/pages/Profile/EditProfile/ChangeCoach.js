import React from 'react';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// components
import TextInput from '../../../inputs/textInput';

const ChangeCoach = () => {
    return (
            <div className='w-[90%] mt-4 flex flex-col items-center px-3 text-sm gap-y-6' style={{color:'var(--soft-white)'}}>
                <div className='flex w-full justify-between items-center'>
                    <p>مربی : محمود شیرازی‌نیا</p>
                    <p>کد کاربری : 22354678987</p>
                </div>
                <TextInput placeholder={'شماره کاربری مربی جدید'} Type={'number'}/>
                <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
            </div>
    );
};

export default ChangeCoach;