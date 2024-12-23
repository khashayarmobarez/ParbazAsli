import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css';

// assets
import AddIcon from '@mui/icons-material/Add';

// api
import { useReturnEquipment, useTriggerEquipmentStatus, useUserEquipments, useUserEquipmentsHistory } from '../../Utilities/Services/equipmentQueries';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import DropDownLine from '../../components/reuseable/DropDownLine';

const EquipmentsList = () => {

    const navigate = useNavigate()
    const location = useLocation(); 
    const { pathname } = location;
    const appTheme = Cookies.get('themeApplied') || 'dark';
    
    const isForClub = pathname.includes('club')

    const equipmentType = 
    pathname.includes('flightEquipment') ? 'Wing' :
        pathname.includes('harness') ? 'Harness' : 'Parachute';

    const AddEquipmentRouteBasedOnThePage = 
    equipmentType === 'Wing' ? '/equipment/addFlightEquipment' :
        equipmentType === 'Harness' ? '/equipment/addHarness' :
            equipmentType === 'Parachute' && '/equipment/addParachute'

    const AddEquipmentRouteBasedOnThePageForClub = 
    equipmentType === 'Wing' ? '/club/addFlightEquipmentForClub' :
        equipmentType === 'Harness' ? '/club/addHarnessForClub' :
            equipmentType === 'Parachute' && '/club/addParachuteForClub'

    const [openDropDowns, setOpenDropDown] = useState([])

    const { data: userEquipmentsData, isLoading, error, refetch: refetchUserEquipmentsData } = useUserEquipments(equipmentType, isForClub)
    const { data: userEquipmentsHistoryData, refetch: refetchHistory } = useUserEquipmentsHistory(equipmentType, isForClub)
    const { mutate: mutateReturnEquipment, isLoading:loadingReturnEquipment } = useReturnEquipment()
    const { mutate: mutateTriggerEquipmentStatus, isLoading:loadingTriggerEquipmentStatus } = useTriggerEquipmentStatus()

    // useEffect to open active dropdown open at firt
    useEffect(() => {
        if(userEquipmentsData && userEquipmentsData.data[0]){
            setOpenDropDown(['Permanent', 'Temporary'])
        }
    }, [ userEquipmentsData ])


    // handlers
        // handle dropdown click
        const handleDropDownClick = (dropDown) => {
            if(openDropDowns.includes(dropDown)){
                setOpenDropDown(openDropDowns.filter(item => item !== dropDown))
            } else {
                setOpenDropDown([...openDropDowns, dropDown])
            }
        }

        const handleEditEquipment = (id) => () => {
            isForClub ?
            navigate(`/EditClubEquipment/${id}`)
            :
            navigate(`/EditEquipment/${id}`);
        };

        const handlePossession = (id) => () => {
            isForClub ?
            navigate(`/possessionTransitionEquipmentClub/${id}`)
            :
            navigate(`/possessionTransitionEquipment/${id}`);
        };

        const handleSubmittingTranfer = (action, id) => {
            if(action === 'accept') {
                // accept
                const formBody = {
                    equipmentId: id,
                    status: 'Accepted',
                    isForClub: isForClub
                }
                
                mutateTriggerEquipmentStatus(formBody, {
                    onSuccess: () => {
                        refetchUserEquipmentsData()
                        toast('وسیله پروازی با موفقیت تایید شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
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
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    }
                })
            } else {
                // decline
                const formBody = {
                    equipmentId: id,
                    status: 'Rejected',
                    isForClub: isForClub
                }
    
                mutateTriggerEquipmentStatus(formBody, {
                    onSuccess: () => {
                        refetchUserEquipmentsData()
                        toast('وسیله پروازی با موفقیت رد شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
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
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    }
                })
            }
        }

        const handleReturnEquipment = (id) => () => {
            
            const formBody = {
                equipmentId: id,
                isForClub: isForClub
            }
    
            mutateReturnEquipment(formBody,{
                onSuccess: () => {
                    refetchUserEquipmentsData()
                    toast('وسیله پروازی با موفقیت مرجوع شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchHistory()
                }
            })
            
        }


    return (
        <div className=' flex flex-col gap-y-4 items-center '>

            <div className='w-full flex flex-col gap-y-4 pb-10 items-center '>
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
                    <p className=' font-medium text-textWarning'>هیچ تجهیزات فعالی ثبت نشده است</p>
                }

                {/* Permanent */}
                {
                userEquipmentsData &&
                userEquipmentsData.data[0] &&
                userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').length > 0 &&
                    <DropDownLine
                    onClickActivation={() => handleDropDownClick('Permanent')}
                    title={'دائمی'} 
                    isActive={openDropDowns.includes('Permanent')}  
                    />
                }
                <div className='w-full flex flex-col items-center gap-4 -mb-4 md:grid md:grid-cols-2'>
                    {
                        openDropDowns.includes('Permanent') &&
                        userEquipmentsData &&
                        userEquipmentsData.data &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').length > 0 &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').map((equipment, index) =>
                            <div key={index} className='w-full flex flex-col gap-4 '>
                                <div className='w-full flex flex-col items-center'>

                                    <div key={equipment.id} className={`bg-bgCard z-10 w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:gap-6 `} 
                                    style={{boxShadow:'var(--shadow-all)'}}>

                                        {
                                            equipment.status === 'Pending' &&
                                            <p className='text-textWarning font-bold'>نیاز به تایید انتقال از {equipment?.transferorFullName}</p> 
                                        }   

                                        <div className=' w-full text-xs flex justify-between items-start gap-y-1 '>
                                            <p className='text-start'>
                                                برند {equipment.brand} / مدل {equipment.model}{equipmentType === "Wing" && ` / کلاس ${equipment.wingClass}`}
                                            </p>
                                            {
                                                equipment.status !== 'Pending' &&
                                                <p>{equipment.flightCount} پرواز  / {equipment.flightHours} ساعت</p>
                                            }
                                        </div>

                                        <div className={` w-full text-xs flex justify-between gap-y-2 items-center ${equipment.status === 'Pending' && '-mt-4'}`}>

                                            
                                            {
                                                equipment.status === 'Pending' &&
                                                    <p>شماره سریال: {equipment.serialNumber}</p>
                                            }

                                            <button className={`${ButtonStyles.normalButton} ${equipment.status === 'Pending' && '-mt-2'} w-[33%] h-10`} 
                                            style={{minWidth:'0', minHeight:'0'}}
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
                                                className={`w-[33%] h-10
                                                    ${!equipment?.isTransitionRestricted && ButtonStyles.normalButton} 
                                                    ${equipment?.isTransitionRestricted && 'bg-bgButtonSecondaryDisabled text-textWarning h-[40px] rounded-3xl'}
                                                `} 
                                                style={{minWidth:'0', minHeight:'0'}}
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
                                            <div className='w-full min-h-16 rounded-b-2xl z-0 mt-[-1.4rem] pt-5 flex justify-between px-4 bg-bgOutputDefault'
                                            style={{boxShadow:'var(--shadow-all)'}}>

                                                <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                                    <div className='w-2 h-2 rounded-full bg-textError'></div>
                                                    <p>آیا این ابزار مورد تایید شما است؟</p>
                                                </div>

                                                <div className='flex gap-x-6 items-center px-2'>
                                                    
                                                    <p 
                                                    onClick={() => handleSubmittingTranfer('accept', equipment.id)}
                                                    disabled={loadingTriggerEquipmentStatus} 
                                                    className='text-textAccent text-sm font-medium' >
                                                        تایید
                                                    </p>

                                                    <p 
                                                    onClick={() => handleSubmittingTranfer('decline', equipment.id)}
                                                    disabled={loadingTriggerEquipmentStatus} 
                                                    className='text-textError text-sm font-medium' >
                                                        رد
                                                    </p>

                                                </div>
                                            </div>
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>


                {/* temporary */}
                {
                    userEquipmentsData &&
                    userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').length > 0 &&
                        <DropDownLine  
                        onClickActivation={() => handleDropDownClick('Temporary')}
                        title={'موقت'} 
                        isActive={openDropDowns.includes('Temporary')}  
                        />
                }

                {
                    openDropDowns.includes('Temporary') &&
                    userEquipmentsData &&
                    userEquipmentsData.data &&
                    userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').map((equipment, index) =>
                        <div key={equipment.id} className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                            <div className={`w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:col-span-1 bg-bgCard `}
                            style={{boxShadow:'var(--shadow-all)'}}>

                                <p className='font-medium text-sm'>{equipment.remainingDaysToExpire} روز از دوره انتقال مانده</p>

                                <div className=' w-full text-xs flex justify-between items-start gap-y-1'>
                                    <p className='text-start'> برند {equipment.brand} / مدل {equipment.model}{equipmentType === "Wing" && ` / کلاس ${equipment.wingClass}`}</p>
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
                        </div>
                    )
                }

                {/* history */}
                {
                    userEquipmentsHistoryData &&
                    userEquipmentsHistoryData.data.length > 0 &&
                        <DropDownLine  
                        onClickActivation={() => handleDropDownClick('History')}
                        title={'تاریخچه'} 
                        isActive={openDropDowns.includes('History')}  
                        />
                }
                <div className='w-full flex flex-col items-center gap-4 md:grid md:grid-cols-2'>
                    {
                        openDropDowns.includes('History') &&
                        userEquipmentsHistoryData &&
                        userEquipmentsHistoryData.data &&
                        userEquipmentsHistoryData.data.map((equipment, index) =>
                            <div key={index} className='w-full flex flex-col gap-4 '>
                                <div key={equipment.id} className={`w-full justify-between items-center px-2 py-4 rounded-[34px] flex gap-y-4 md:col-span-1 bg-bgCard`} 
                                style={{boxShadow:'var(--shadow-all)'}}>

                                    <div className=' w-auto text-xs flex flex-col justify-between items-start gap-y-2'>
                                        <p className='text-start'> برند {equipment.brand} / مدل {equipment.model}{equipmentType === "Wing" && ` / کلاس ${equipment.wingClass}`}</p>
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
                            </div>
                        )
                    }
                </div>
            </div>

            

            <Link to={isForClub ? AddEquipmentRouteBasedOnThePageForClub : AddEquipmentRouteBasedOnThePage} className=' z-20 fixed bottom-[4rem] w-[90%] bg-bgMenu rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] '>
                <button className={`${ButtonStyles.addButton} w-full`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>


        </div>
    );
};

export default EquipmentsList;