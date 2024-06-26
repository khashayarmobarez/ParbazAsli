import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// queries
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';

// css classes 
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

    const handlePossession = (id) => () => {
        navigate(`/possessionTransitionEquipment/${id}`);
    };

    return (
        <div className=' flex flex-col gap-y-12 items-center'>

            <div className='w-full flex flex-col gap-y-4 pb-10 items-center md:grid md:grid-cols-2 md:gap-6'>

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

                                <button className={`${ButtonStyles.normalButton} text-[var(--yellow-text)]`} onClick={handleEditEquipment(equipment.id)} >
                                    {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                                    'ویرایش'
                                    :
                                    'جزئیات'
                                    }
                                </button>

                                <button className={ButtonStyles.normalButton} onClick={handlePossession(equipment.id)} >انتقال مالکیت</button>

                            </div>

                        </div>
                    )
                }

            </div>

            

            <Link to='/equipment/addHarness' className='fixed bottom-[3.2rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default Harness;