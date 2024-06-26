import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// queries
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddIcon from '@mui/icons-material/Add';

const FlightEquipment = () => {

    const navigate = useNavigate()

    const { data: userEquipmentsData, loading, error } = useUserEquipments(2)

    useEffect(() => {
        console.log(userEquipmentsData)
    },[userEquipmentsData])


    const handleEditEquipment = (id) => () => {
        navigate(`/EditEquipment/${id}`);
    };

    const handlePossession = (id) => () => {
        navigate(`/possessionTransitionEquipment/${id}`);
    };

    return (
        <div className=' flex flex-col gap-y-6 items-center '>

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

            

            <Link to='/equipment/addFlightEquipment' className='fixed bottom-[3.2rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default FlightEquipment;