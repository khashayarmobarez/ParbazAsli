import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// css classes 
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// query
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';

// mui
import AddIcon from '@mui/icons-material/Add';

// comps
import Loader from '../../Loader/Loader';


const Parachute = (props) => {

    const navigate = useNavigate()

    const { data: userEquipmentsData, loading, error } = useUserEquipments(1)

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
                loading && 
                <div className='flex w-full h-[90vh] items-center justify-center'>
                    <Loader />
                </div>
            }
            {
                error && <p>error</p>
            }
            {
            userEquipmentsData &&
            userEquipmentsData.data.map(equipment =>
                    <div key={equipment.id} className={`w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                        <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                            <p> مدل {equipment.model} / برند {equipment.brand}</p>
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
                <p className=' font-medium'>هیچ تجهیزاتی ثبت نشده است</p>
            }

            </div>

            

            <Link to='/equipment/addParachute' className='fixed bottom-[3.2rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default Parachute;