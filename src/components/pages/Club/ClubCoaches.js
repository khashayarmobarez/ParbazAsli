import React, { useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../styles/Boxes/DataBox.module.css'

// mui
import AddIcon from '@mui/icons-material/Add';
import ClubCoachesDetails from './ClubCoachesDetails';
import CloseIcon from '@mui/icons-material/Close';
import TextInput from '../../inputs/textInput';

const ClubCoaches = () => {

    // popUp use state
    const [showPopup, setShowPopup] = useState(false);
    // State to hold the value of the input
    const [coachCode, setCoachCode] = useState('');

    // Function to handle changes in the input value
    const handleCoachCodeChange = (event) => {
        setCoachCode(event.target.value);
    };

    return (
        <div className='w-[90%] flex flex-col justify-center items-center gap-y-8 mt-4'>

            <div className=' bottom-24 w-[100%] bg-[#131423] rounded-xl'>
                <button onClick={() => setShowPopup(true)} className={`${ButtonStyles.addButton} w-[100%]`} >
                    <AddIcon />
                    <p>افزودن مربی باشگاه</p>
                </button>
            </div>

            <div className='w-full flex flex-col gap-y-4'>
                <ClubCoachesDetails />
                <ClubCoachesDetails />
            </div>

            {/* submit pop up */}
            <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-xl mt-[-3rem] ' style={{color:'var(--yellow-text)'}}>افزودن مربی</h3>

                <div className='w-[85%]'> 
                     <TextInput placeholder={'کد کاربری مربی را وارد کنید'} 
                        Type={'number'}
                        value={coachCode}
                        onChange={handleCoachCodeChange}/>
                </div>

                <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>

            </form>

        </div>
    );
};

export default ClubCoaches;