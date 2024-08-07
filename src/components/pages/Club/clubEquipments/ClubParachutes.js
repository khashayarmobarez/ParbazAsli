import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// css classes 
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// query
import { useReturnEquipment, useUserEquipments, useUserEquipmentsHistory } from '../../../../Utilities/Services/equipmentQueries';

// mui
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CircularProgressLoader from '../../../Loader/CircularProgressLoader';
import { toast } from 'react-toastify';
import DropDownLine from '../../../reuseable/DropDownLine';

// comps


const Parachute = (props) => {

    const navigate = useNavigate()

    const [DropDown, setDropDown] = useState('')
    const [DropDownForTemporary, setDropDownForTemporary] = useState('')
    const [DropDownForHistory, setDropDownForHistory] = useState('')

    const { data: userEquipmentsData, isLoading, error, refetch: refetchUserEquipmentsData } = useUserEquipments(1, true)
    const { data: userEquipmentsHistoryData, HistoryLoading, historyError, refetch: refetchHistory  } = useUserEquipmentsHistory(1, true)
    const { mutate: mutateReturnEquipment, isLoading:loadingReturnEquipment } = useReturnEquipment()

    // useEffect to open active dropdown open at firt
    useEffect(() => {
        if(userEquipmentsData && userEquipmentsData.data[0]){
            setDropDown('Permanent')
            setDropDownForTemporary('Temporary')
        }
    }, [ userEquipmentsData ])

    // dropDown onClick
    const handleDropDownClick = (newDropDown) => {
        DropDown === newDropDown ?
        setDropDown('') :
        setDropDown(newDropDown)
    }

    const handleTemporaryDropDownClick = (newDropDown) => {
        DropDownForTemporary === newDropDown ?
        setDropDownForTemporary('') :
        setDropDownForTemporary(newDropDown)
    }

    const handleHistoryDropDownClick = (newDropDown) => {
        DropDownForHistory === newDropDown ?
        setDropDownForHistory('') :
        setDropDownForHistory(newDropDown)
    }

    const handleEditEquipment = (id) => () => {
        navigate(`/EditClubEquipment/${id}`);
    };

    const handlePossession = (id) => () => {
        navigate(`/possessionTransitionEquipmentClub/${id}`);
    };

    const handleReturnEquipment = (id) => () => {
        const formBody = {
            equipmentId: id,
            isForClub: false
        }

        mutateReturnEquipment(formBody,{
            onSuccess: () => {
                refetchUserEquipmentsData()
                toast('وسیله پروازی با موفقیت مرجوع شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                refetchHistory()
            }
        })
        
    }

    return (
        <div className=' flex flex-col gap-y-12 items-center'>

            <div className='w-full flex flex-col gap-y-4 pb-10 items-center'>
            {
                isLoading && 
                <CircularProgressLoader/>
            }
            {
                error && <p className='mt-10'>{error.response.data.ErrorMessages[0].ErrorMessage}</p>
            }
                {
                    userEquipmentsData &&
                    !userEquipmentsData.data[0] &&
                    <p className=' font-medium'>هیچ تجهیزات فعالی ثبت نشده است</p>
                }

                {/* Permanent */}
                {
                userEquipmentsData &&
                userEquipmentsData.data[0] &&
                    <DropDownLine  
                    onClickActivation={() => handleDropDownClick('Permanent')}
                    title={'دائمی'} 
                        dropDown={DropDown} 
                        isActive={DropDown === 'Permanent'}  
                    />
                }
                {
                    DropDown === 'Permanent' &&
                    userEquipmentsData &&
                    userEquipmentsData.data &&
                    userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').map(equipment =>
                            <div key={equipment.id} className={`w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                                <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                    <p> برند {equipment.brand} / مدل {equipment.model}</p>
                                    <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت</p>
                                </div>

                                <div className=' w-full text-xs flex justify-between items-start gap-y-1'>

                                    <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)} >
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


                {/* temporary */}
                {
                    userEquipmentsData &&
                    userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').length > 0 &&
                        <DropDownLine  
                        onClickActivation={() => handleTemporaryDropDownClick('Temporary')}
                            title={'موقت'} 
                            dropDown={DropDownForTemporary} 
                            isActive={DropDownForTemporary === 'Temporary'}  
                        />
                }
                {
                    DropDownForTemporary === 'Temporary' &&
                    userEquipmentsData &&
                    userEquipmentsData.data &&
                    userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').map(equipment =>
                            <div key={equipment.id} className={`w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                                <p className='font-medium text-sm'>{equipment.remainingDaysToExpire} روز از دوره انتقال مانده</p>

                                <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                    <p> برند {equipment.brand} / مدل {equipment.model} / کلاس {equipment.wingClass}</p>
                                    <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت</p>
                                </div>

                                <div className=' w-full text-xs flex justify-between items-start gap-y-1'>

                                    <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)} >
                                        {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                                        'ویرایش'
                                        :
                                        'جزئیات'
                                        }
                                    </button>

                                    <button className={` ${ButtonStyles.normalButton} ${loadingReturnEquipment && 'opacity-55'}`} disabled={loadingReturnEquipment} onClick={handleReturnEquipment(equipment.id)} >مرجوع کردن</button>
                                </div>

                            </div>
                        )
                }

                {/* history */}
                {
                    userEquipmentsHistoryData &&
                    userEquipmentsHistoryData.data.length > 0 &&
                        <DropDownLine  
                        onClickActivation={() => handleHistoryDropDownClick('History')}
                            title={'تاریخچه'} 
                            dropDown={DropDownForHistory} 
                            isActive={DropDownForHistory === 'History'}  
                        />
                }
                {
                    DropDownForHistory === 'History' &&
                    userEquipmentsHistoryData &&
                    userEquipmentsHistoryData.data &&
                    userEquipmentsHistoryData.data.map(equipment =>
                            <div key={equipment.id} className={`w-full justify-between items-center px-2 py-4 rounded-[1.6rem] flex gap-y-6 md:col-span-1`} style={{background:'var(--organs-coachData-bg', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                                <div className=' w-auto text-xs flex flex-col justify-between items-start gap-y-2'>
                                    <p> برند {equipment.brand} / مدل {equipment.model} / کلاس {equipment.wingClass}</p>
                                    <p> شماره سریال: {equipment.serialNumber}</p>
                                </div>

                                <div className=' w-auto text-xs flex justify-between items-start gap-y-1'>

                                    <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)} >
                                        {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                                        'ویرایش'
                                        :
                                        'جزئیات'
                                        }
                                    </button>

                                </div>

                            </div>
                        )
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