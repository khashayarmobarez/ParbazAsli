import React from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

const SubmitForm = ({ showPopup, setShowPopup, handlePost, text, isLoading }) => {

    

    return (
        <div className={`${showPopup ? 'fixed' : 'hidden'} top-0 right-0 w-full h-full backdrop-blur-lg flex justify-center items-center z-[150]`}>
            <div  className={` ${boxStyles.containerChangeOwnership}  w-[80%] md:w-[304px] h-[280px] flex flex-col justify-around items-center top-52 right-[10%] `}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-textWarning text-xl '>تاییدیه</h3>

                <p className='text-base w-[90%]' >{text}</p>


                <div className='w-full flex justify-around items-center'>
                    <button 
                    type="reset" 
                    disabled={isLoading} 
                    className={`${ButtonStyles.normalButton} w-24`} 
                    onClick={() => setShowPopup(false)}>
                        لغو
                    </button>
                    <button 
                    type="submit" 
                    disabled={isLoading} 
                    className={`${ButtonStyles.addButton} w-24`} 
                    onClick={handlePost}>
                        {isLoading ? 'در حال ارسال...' : 'تایید'}
                    </button>

                    
                </div>

            </div>
        </div>
    );
};

export default SubmitForm;