import React, { useState } from 'react';

// css classes 
import styles from './FlightEquipment.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import inputStyles from '../../../styles/Inputs/Inputs.module.css'
import boxStyle from '../../../styles/Boxes/DataBox.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const FlightEquipment = (props) => {

    const { data } = props;

    const [inputValue, setInputValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // Event handler for input change
    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform any action with the input value, such as submitting it to a backend or processing it in some way
        console.log('Submitted value:', inputValue);
        // Clear the input field after submission
        setInputValue('');
    };

    return (
        <div className=' flex flex-col gap-y-6 items-center '>

            <div className='w-full flex flex-col gap-y-6 items-center md:grid md:grid-cols-2 md:gap-6'>

                <div className={`${styles.container} w-full  md:col-span-1`}>

                    <div className=' text-xs flex flex-col items-start gap-y-1'>
                        <p>کلاسB / مدل{data?.data.id} / برندNiviuk</p>
                        <p>77 پرواز / 24 ساعت</p>
                    </div>

                    <button className={ButtonStyles.normalButton} onClick={() => setShowPopup(true)} > انتقال مالکیت</button>

                </div>
                <div className={`${styles.container} w-full  md:col-span-1`}>

                    <div className=' text-xs flex flex-col items-start gap-y-1'>
                        <p>کلاسB / مدل{data?.data.id} / برندNiviuk</p>
                        <p>77 پرواز / 24 ساعت</p>
                    </div>

                    <button className={ButtonStyles.normalButton} onClick={() => setShowPopup(true)} > انتقال مالکیت</button>

                </div>
                <div className={`${styles.container} w-full  md:col-span-1`}>

                    <div className=' text-xs flex flex-col items-start gap-y-1'>
                        <p>کلاسB / مدل{data?.data.id} / برندNiviuk</p>
                        <p>77 پرواز / 24 ساعت</p>
                    </div>

                    <button className={ButtonStyles.normalButton} onClick={() => setShowPopup(true)} > انتقال مالکیت</button>

                </div>
            </div>

            {/* pop up */}
            <form onSubmit={handleSubmit} className={` ${boxStyle.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>انتقال مالکیت</h3>

                <div className='w-[90%] mt-[-1rem]'>
                    <PersonOutlineOutlinedIcon sx={{position:'relative', top:'2.2rem', left:'7.5rem'}} />
                    
                    <input
                    className={`${inputStyles.input1} w-[100%] h-12 rounded-xl pr-8`}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="کد کاربری مالک جدید"
                    />
                </div>

                <button type="submit" className={`${ButtonStyles.addButton} w-32`} onClick={() => setShowPopup(false)}>ارسال</button>

            </form>

            

            <Link to='/equipment/addFlightEquipment' className='fixed bottom-24 w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4  '>
                <button className={`${ButtonStyles.addButton} w-[100%]`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default FlightEquipment;