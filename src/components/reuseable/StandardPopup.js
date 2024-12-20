import React from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'


const StandardPopup = ({ showPopup, setShowPopup, handleSubmit, topicText,explanationtext, submitText, declineText, isFormWithOneButton }) => {
    return (
        <div className={` z-50 w-[100vw] h-[100vh] backdrop-blur ${showPopup ? 'absolute ' : 'hidden' }   `}>
            <div 
            className={` ${boxStyles.containerChangeOwnership} fixed  z-20 py-8 w-[80%] md:w-[304px] min-h-[280px] gap-y-6 flex flex-col justify-around items-center top-52 right-[10%]`}
            >

                <CloseIcon onClick={() => setShowPopup(false)} sx={{position:'absolute', top:'1rem', right:'1rem'  }} />

                <h3 className=' text-textError text-xl '>{topicText || 'تاییدیه'}</h3>

                <p className='text-sm w-[90%]' >{explanationtext || 'توضیحات'}</p>

                {/* for two button */}
                {
                    !isFormWithOneButton &&  
                    <div className='w-full flex justify-around items-center'>
                        <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>{declineText || 'لغو'}</button>
                        <button type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={handleSubmit}>{submitText || 'تایید'}</button>
                    </div>
                }

                {/* for one button */}
                {
                    isFormWithOneButton &&
                    <div className='w-full flex justify-around items-center'>
                        <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={handleSubmit}>{submitText || 'تایید'}</button>
                    </div>
                }

            </div>
        </div>
    );
};

export default StandardPopup;