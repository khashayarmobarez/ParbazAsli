import React from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

const SubmitForm = ({ handleSubmit, showPopup, setShowPopup, handlePost, text }) => {

    

    return (
        <div className={`${showPopup ? 'fixed' : 'hidden'} top-0 right-0 w-full h-full backdrop-blur-lg flex justify-center items-center z-[150]`}>
            <div  className={` ${boxStyles.containerChangeOwnership}  w-[80%] md:w-[304px] h-[280px] flex flex-col justify-around items-center top-52 right-[10%] `}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-textWarning text-xl mt-[-3rem] '>تاییدیه</h3>

                <p className='text-base w-[90%]' >{text}</p>


                <div className='w-full flex justify-around items-center'>
                    <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>لغو</button>
                    <button type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={() => handlePost()}>تایید</button>
                </div>

            </div>
        </div>
    );
};

export default SubmitForm;