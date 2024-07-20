import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// css classes 
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// query
import { useUserEquipments } from '../../../../Utilities/Services/equipmentQueries';

// mui
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// comps


const ClubParachutes = (props) => {

    const navigate = useNavigate()

    const { data: userEquipmentsData, isLoading, error } = useUserEquipments(1, true)

    const handleEditEquipment = (id) => () => {
        // navigate(`/EditEquipment/${id}`);
        toast('در حال طراحی و توسعه...', {
            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: 'dark',
            style: { width: "350px" }
        });
    };

    const handlePossession = (id) => () => {
        // navigate(`/possessionTransitionEquipment/${id}`);
        toast('در حال طراحی و توسعه...', {
            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: 'dark',
            style: { width: "350px" }
        });
    };

    return (
        <div className=' flex flex-col gap-y-12 items-center'>

            <div className='w-full flex flex-col gap-y-4 pb-10 items-center md:grid md:grid-cols-2 md:gap-6'>
            {
                isLoading && 
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
                error && <p className='mt-10'>{error.response.data.ErrorMessages[0].ErrorMessage}</p>
            }
            {
            userEquipmentsData &&
            userEquipmentsData.data.map(equipment =>
                    <div key={equipment.id} className={`w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                        <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                            <p> برند {equipment.brand} / مدل {equipment.model} </p>
                            {/* / برند {equipment.brand} */}
                            <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت / فعال تا {equipment.remainingTimeToRepackInDays} روز</p>
                        </div>

                        <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                            <button className={`${ButtonStyles.normalButton} text-[var(--yellow-text)]`} onClick={handleEditEquipment(equipment.id)} >ویرایش</button>
                            <button className={ButtonStyles.normalButton} onClick={handlePossession(equipment.id)} >انتقال مالکیت</button>
                        </div>

                    </div>
                )
            }
            {
                userEquipmentsData &&
                !userEquipmentsData.data[0] &&
                <div className='w-full flex justify-center items-center self-center md:col-span-2'>
                    <p className=' font-medium text-center '>هیچ تجهیزاتی ثبت نشده است</p>
                </div>
            }

            </div>

            

            <Link to='/club/addParachuteForClub' className='fixed bottom-[3.2rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default ClubParachutes;