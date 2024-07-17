import React, { useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../styles/Boxes/DataBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';
import TextInput from '../../inputs/textInput';
import DropDownLine from '../../reuseable/DropDownLine';
import ClubCoachBox from './ClubCoachBox';

const ClubCoaches = () => {
    
    const [DropDown, setDropDown] = useState('');
    // popUp use state
    const [showPopup, setShowPopup] = useState(false);
    // State to hold the value of the input
    const [coachCode, setCoachCode] = useState('');

    // Function to handle the dropdown click
    const handleDropDownClick = (dropDown) => {
        setDropDown(dropDown);
        if (DropDown === dropDown) {
            setDropDown('');
        }
    }

    // Function to handle changes in the input value
    const handleCoachCodeChange = (event) => {
        setCoachCode(event.target.value);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center pt-16'>
            <div className='w-[90%] flex flex-col items-center gap-y-4'>

                <DropDownLine  
                    onClick={() => handleDropDownClick('activeCoaches')}
                    title={'مربیان'} 
                    dropDown={'activeCoaches'} 
                    isActive={DropDown === `activeCoaches`}  
                />

                {DropDown === `activeCoaches` && 
                    <div className='w-full flex flex-col gap-y-4'>
                        <ClubCoachBox />
                        <ClubCoachBox />
                    </div>
                }

                <DropDownLine  
                    onClick={() => handleDropDownClick('PreviousCoaches')}
                    title={'مربیان سابق'} 
                    dropDown={'PreviousCoaches'} 
                    isActive={DropDown === `PreviousCoaches`}  
                />

                {DropDown === `PreviousCoaches` && 
                    'PreviousCoaches'
                }


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

        </div>
    );
};

export default ClubCoaches;