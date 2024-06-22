import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// queries
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';

// css classes 
import styles from './FlightEquipment.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import inputStyles from '../../../styles/Inputs/Inputs.module.css'
import boxStyle from '../../../styles/Boxes/DataBox.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


const Harness = (props) => {

    const navigate = useNavigate()

    const { data: userEquipmentsData, loading, error } = useUserEquipments(3)

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

    const handleEditEquipment = (id) => () => {
        navigate(`/EditEquipment/${id}`);
    };

    return (
        <div className=' flex flex-col gap-y-12 items-center'>

            <div className='w-full flex flex-col gap-y-6 pb-10 items-center md:grid md:grid-cols-2 md:gap-6'>

            {
                    loading && <p>loading...</p>
                }
                {
                    error && <p>error</p>
                }
                {userEquipmentsData &&
                userEquipmentsData.data.map(equipment =>
                        <div key={equipment.id} className={`w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                            <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                <p>کلاس{equipment.wingClass} / مدل {equipment.model} / برند {equipment.brand}</p>
                                <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت</p>
                            </div>

                            <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                <button className={`${ButtonStyles.normalButton} text-[var(--yellow-text)]`} onClick={handleEditEquipment(equipment.id)} >ویرایش</button>
                                <button className={ButtonStyles.normalButton} onClick={() => setShowPopup(true)} >انتقال مالکیت</button>
                            </div>

                        </div>
                    )
                }

            </div>

            {/* pop up */}
            <form onSubmit={handleSubmit} className={` ${boxStyle.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}   w-[304px] h-[280px] flex flex-col justify-around items-center md:z-[50]`}>

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

            

            <Link to='/equipment/addHarness' className='fixed bottom-[4.5rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4'>
                <button className={`${ButtonStyles.addButton} w-[100%]`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default Harness;