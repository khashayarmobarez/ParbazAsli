import React from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'


const StandardPopup = ({ showPopup, setShowPopup, handleSubmit, topicText,explanationtext, submitText, declineText, isFormWithOneButton }) => {
    return (
        <div className={` w-[100vw] h-[100vh] backdrop-blur ${showPopup ? 'absolute ' : 'hidden' }   `}>
            <div className={` ${boxStyles.containerChangeOwnership} fixed z-20 py-10 w-[90%] md:w-[354px] min-h-[280px] gap-y-6 flex flex-col justify-around items-center top-52 right-[5%] md:right-[40%]`} >

                <CloseIcon onClick={() => setShowPopup(false)} sx={{position:'absolute', top:'1rem', right:'1rem'  }} />

                <h3 className=' text-textWarning text-xl '>{topicText || 'تاییدیه'}</h3>

                <p className='text-base w-[90%] mt-4' >{explanationtext || 'توضیحات'}</p>

                {/* for two button */}
                {
                    !isFormWithOneButton &&
                    <div className='w-full flex justify-center px-4 items-center gap-x-10 mt-4'>
                        <button 
                        type="reset" 
                        className={`${ButtonStyles.normalButton} w-[108px]`} 
                        style={{minWidth:'0'}}
                        onClick={() => setShowPopup(false)}>
                            {declineText || 'لغو'}  
                        </button>
                        <button 
                        type="submit" 
                        className={`${ButtonStyles.addButton} w-[108px]`} 
                        style={{minWidth:'0'}}
                        onClick={handleSubmit}>
                            {submitText || 'تایید'}
                        </button>
                    </div>
                }

                {/* for one button */}
                {
                    isFormWithOneButton &&
                    <div className='w-full flex justify-around items-center -mt-2'>
                        <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={handleSubmit}>{submitText || 'تایید'}</button>
                    </div>
                }

            </div>
        </div>
    );
};

export default StandardPopup;