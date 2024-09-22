import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// queries
import { useReturnEquipment, useTriggerEquipmentStatus, useUserEquipments, useUserEquipmentsHistory } from '../../../Utilities/Services/equipmentQueries';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddIcon from '@mui/icons-material/Add';
import CircularProgressLoader from '../../Loader/CircularProgressLoader';
import DropDownLine from '../../reuseable/DropDownLine';
import { toast } from 'react-toastify';

// comps

const FlightEquipment = () => {

    const navigate = useNavigate()

    const [DropDown, setDropDown] = useState('')
    const [DropDownForTemporary, setDropDownForTemporary] = useState('')
    const [DropDownForHistory, setDropDownForHistory] = useState('')

    const { data: userEquipmentsData, isLoading, error, refetch: refetchUserEquipmentsData } = useUserEquipments(2, false)
    const { data: userEquipmentsHistoryData, HistoryLoading, historyError, refetch: refetchHistory } = useUserEquipmentsHistory(2, false)
    const { mutate: mutateReturnEquipment, isLoading:loadingReturnEquipment } = useReturnEquipment()
    const { mutate: mutateTriggerEquipmentStatus, isLoading:loadingTriggerEquipmentStatus } = useTriggerEquipmentStatus()

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
        navigate(`/EditEquipment/${id}`);
    };

    const handlePossession = (id) => () => {
        navigate(`/possessionTransitionEquipment/${id}`);
    };

    const handleSubmittingTranfer = (action, id) => {
        if(action === 'accept') {
            // accept
            const formBody = {
                equipmentId: id,
                status: 'Accepted',
                isForClub: false
            }
            
            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    refetchUserEquipmentsData()
                    toast('وسیله پروازی با موفقیت تایید شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    refetchHistory()
                }
            }, { onError: (error) => {
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                }
            })
        } else {
            // decline
            const formBody = {
                equipmentId: id,
                status: 'Rejected',
                isForClub: false
            }

            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    refetchUserEquipmentsData()
                    toast('وسیله پروازی با موفقیت رد شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    refetchHistory()
                }
            }, { onError: (error) => {
                console.log(error)
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                }
            })
        }
    }

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
        <div className=' flex flex-col gap-y-6 items-center '>

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
                userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').length > 0 &&
                    <DropDownLine  
                    onClickActivation={() => handleDropDownClick('Permanent')}
                    title={'دائمی'} 
                        dropDown={DropDown} 
                        isActive={DropDown === 'Permanent'}  
                    />
                }
                <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                    {
                        DropDown === 'Permanent' &&
                        userEquipmentsData &&
                        userEquipmentsData.data &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').length > 0 &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').map(equipment =>
                                <div className='w-full flex flex-col items-center'>

                                    <div key={equipment.id} className={` z-10 w-full justify-between items-center px-5 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:gap-6`} 
                                    style={{background:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>

                                        {
                                            equipment.status === 'Pending' &&
                                            <p className='text-[var(--yellow-text)] font-bold -mb-2'>تایید انتقال از {equipment?.transferorFullName}</p> 
                                        }   

                                        <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                            <p> برند {equipment.brand} / مدل {equipment.model} / کلاس {equipment.wingClass}</p>
                                            {
                                                equipment.status !== 'Pending' &&
                                                <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت</p>
                                            }
                                        </div>

                                        <div className={` w-full text-xs flex justify-between gap-y-1 items-center ${equipment.status === 'Pending' && '-mt-4'}`}>

                                            
                                            {
                                                equipment.status === 'Pending' &&
                                                    <p>{equipment.serialNumber}</p>
                                            }

                                            <button className={`${ButtonStyles.normalButton} ${equipment.status === 'Pending' && '-mt-2'}`} 
                                            onClick={handleEditEquipment(equipment.id)} >
                                                {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') && equipment.status !== 'Pending' ?
                                                'ویرایش'
                                                :
                                                'جزئیات'
                                                }
                                            </button>

                                            {
                                                equipment.status !== 'Pending' &&
                                                <button 
                                                className={`${ButtonStyles.normalButton} ${equipment?.isTransitionRestricted && 'opacity-50 text-[var(--yellow-text)]'} `} 
                                                onClick={handlePossession(equipment.id)}
                                                disabled={equipment?.isTransitionRestricted} >
                                                    {equipment?.isTransitionRestricted ?
                                                    'در انتظار ...'
                                                    :
                                                    'انتقال مالکیت'
                                                }
                                                </button>
                                            }

                                        </div>

                                    </div>

                                    {
                                        equipment.status === 'Pending' &&
                                            <div className='w-full min-h-16 rounded-b-2xl z-0 mt-[-1rem] pt-5 flex justify-between px-4' 
                                            style={{background: 'var(--syllabus-data-boxes-bg)',
                                                boxShadow: 'var(--organs-coachData-boxShadow)'}}>

                                                <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                                    <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--notification-red)'}}></div>
                                                    <p>آیا این ابزار مورد تایید شما است؟</p>
                                                </div>

                                                <div className='flex gap-x-6 items-center px-2'>
                                                    
                                                    <p 
                                                    onClick={() => handleSubmittingTranfer('accept', equipment.id)}
                                                    disabled={loadingTriggerEquipmentStatus} 
                                                    className='text-[var(--yellow-text)] text-sm font-medium'  >
                                                        تایید
                                                    </p>

                                                    <p 
                                                    onClick={() => handleSubmittingTranfer('decline', equipment.id)}
                                                    disabled={loadingTriggerEquipmentStatus} 
                                                    className='text-[var(--red-text)] text-sm font-medium' >
                                                        رد
                                                    </p>

                                                </div>
                                            </div>
                                    }

                                </div>
                            )
                    }
                </div>


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

                <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
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
                </div>

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

                <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
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
                
            </div>

            

            <Link to='/equipment/addFlightEquipment' className=' z-20 fixed bottom-[3.2rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default FlightEquipment;