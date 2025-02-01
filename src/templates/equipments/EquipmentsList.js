import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// assets
import AddIcon from '@mui/icons-material/Add';

// api
import { useReturnEquipment, useTriggerEquipmentStatus, useUserEquipments, useUserEquipmentsHistory } from '../../Utilities/Services/equipmentQueries';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import DropDownLine from '../../components/reuseable/DropDownLine';
import LowOpacityBackForStickedButtons from '../../components/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const EquipmentsList = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate()
    const location = useLocation(); 
    const isDesktop = useMediaQuery('(min-width:768px)');
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

        const handleSubmittingTransfer = (action, id) => {
            if (action === 'accept') {
                // accept
                const formBody = {
                    equipmentId: id,
                    status: 'Accepted',
                };
        
                mutateTriggerEquipmentStatus(formBody, {
                    onSuccess: () => {
                        refetchUserEquipmentsData();
                        toast(t('equipment.acceptSuccess'), {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        refetchHistory();
                    },
                    onError: (error) => {
                        let errorMessage = t('equipment.acceptError');
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
                });
            } else {
                // decline
                const formBody = {
                    equipmentId: id,
                    status: 'Rejected',
                };
        
                mutateTriggerEquipmentStatus(formBody, {
                    onSuccess: () => {
                        refetchUserEquipmentsData();
                        toast(t('equipment.rejectSuccess'), {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        refetchHistory();
                    },
                    onError: (error) => {
                        console.log(error);
                        let errorMessage = t('equipment.acceptError');
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
                });
            }
        };
        
        const handleReturnEquipment = (id) => () => {
            const formBody = {
                equipmentId: id,
                isForClub: isForClub
            };
        
            mutateReturnEquipment(formBody, {
                onSuccess: () => {
                    refetchUserEquipmentsData();
                    toast(t('equipment.returnSuccess'), {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchHistory();
                }
            });
        };
        


        return (
            <div className='flex flex-col gap-y-4 items-center'>
                <div className='w-full flex flex-col gap-y-4 pb-10 items-center'>
                    {
                        isLoading &&
                        <CircularProgressLoader />
                    }
                    {
                        error && <p className='mt-10'>{error.response.data.ErrorMessages[0].ErrorMessage}</p>
                    }
                    {
                        userEquipmentsData &&
                        !userEquipmentsData.data[0] &&
                        <p className='font-medium text-textWarning'>{t('equipment.noActiveEquipment')}</p>
                    }
        
                    {/* Permanent */}
                    {
                        userEquipmentsData &&
                        userEquipmentsData.data[0] &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Permanent').length > 0 &&
                        <DropDownLine
                            onClickActivation={() => handleDropDownClick('Permanent')}
                            title={t('equipment.permanent')}
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
                                <div key={index} className='w-full flex flex-col gap-4'>
                                    <div className='w-full flex flex-col items-center'>
                                        <div key={equipment.id} className={`bg-bgCard z-10 w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:gap-6`}
                                            style={{ boxShadow: 'var(--shadow-all)' }}>
                                            {
                                                equipment.status === 'Pending' &&
                                                <p className='text-textWarning font-bold'>{t('equipment.pendingTransfer', { transferorFullName: equipment?.transferorFullName })}</p>
                                            }
                                            <div className='w-full text-xs flex justify-between items-start gap-y-1'>
                                                <p className='text-start'>
                                                    {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                                                    {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                                                </p>
                                                {
                                                    equipment.status !== 'Pending' &&
                                                    <p>{t('equipment.flightCountDuration', { flightCount: equipment.flightCount, flightDuration: equipment.flightDuration })}</p>
                                                }
                                            </div>
                                            <div className={`w-full text-xs flex justify-between gap-y-2 items-center ${equipment.status === 'Pending' && '-mt-4'}`}>
                                                {
                                                    equipment.status === 'Pending' &&
                                                    <p>{t('equipment.serialNumber', { serialNumber: equipment.serialNumber })}</p>
                                                }
                                                <button className={`${ButtonStyles.normalButton} ${equipment.status === 'Pending' && '-mt-2'} w-[33%] h-10`}
                                                    style={{ minWidth: '0', minHeight: '0' }}
                                                    onClick={handleEditEquipment(equipment.id)}>
                                                    {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') && equipment.status !== 'Pending' ?
                                                        t('equipment.edit')
                                                        :
                                                        t('equipment.details')
                                                    }
                                                </button>
                                                {
                                                    equipment.status !== 'Pending' &&
                                                    <button
                                                        className={`w-[33%] h-10
                                                        ${!equipment?.isTransitionRestricted && ButtonStyles.normalButton}
                                                        ${equipment?.isTransitionRestricted && 'bg-bgButtonSecondaryDisabled text-textWarning h-[40px] rounded-3xl'}`}
                                                        style={{ minWidth: '0', minHeight: '0' }}
                                                        onClick={handlePossession(equipment.id)}
                                                        disabled={equipment?.isTransitionRestricted}>
                                                        {equipment?.isTransitionRestricted ?
                                                            t('equipment.transferRestricted')
                                                            :
                                                            t('equipment.transfer')
                                                        }
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        {
                                            equipment.status === 'Pending' &&
                                            <div className='w-full min-h-16 rounded-b-[34px] z-0 mt-[-1.4rem] pt-5 flex justify-between px-4 bg-bgOutputDefault'
                                                style={{ boxShadow: 'var(--shadow-all)' }}>
                                                <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                                    <div className='w-2 h-2 rounded-full bg-textError'></div>
                                                    <p>{t('equipment.accept')}</p>
                                                </div>
                                                <div className='flex gap-x-6 items-center px-2'>
                                                    <p
                                                        onClick={() => handleSubmittingTransfer('accept', equipment.id)}
                                                        disabled={loadingTriggerEquipmentStatus}
                                                        className='text-textAccent text-sm font-medium'>
                                                        {t('equipment.accept')}
                                                    </p>
                                                    <p
                                                        onClick={() => handleSubmittingTransfer('decline', equipment.id)}
                                                        disabled={loadingTriggerEquipmentStatus}
                                                        className='text-textError text-sm font-medium'>
                                                        {t('equipment.reject')}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
        
                    {/* Temporary */}
                    {
                        userEquipmentsData &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').length > 0 &&
                        <DropDownLine
                            onClickActivation={() => handleDropDownClick('Temporary')}
                            title={t('equipment.temporary')}
                            isActive={openDropDowns.includes('Temporary')}
                        />
                    }
                    {
                        openDropDowns.includes('Temporary') &&
                        userEquipmentsData &&
                        userEquipmentsData.data &&
                        userEquipmentsData.data.filter(equipment => equipment.ownershipType === 'Temporary').map((equipment, index) =>
                            <div key={equipment.id} className='w-full flex flex-col gap-4 md:grid md:grid-cols-2'>
                                <div className={`w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:col-span-1 bg-bgCard`}
                                    style={{ boxShadow: 'var(--shadow-all)' }}>
                                    <p className='font-medium text-sm'>{t('equipment.daysToExpire', { daysToExpire: equipment.remainingDaysToExpire })}</p>
                                    <div className='w-full text-xs flex justify-between items-start gap-y-1'>
                                        <p className='text-start'>
                                            {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                                            {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                                        </p>
                                        <p>{t('equipment.flightCountDuration', { flightCount: equipment.flightCount, flightDuration: equipment.flightDuration })}</p>
                                    </div>
                                    <div className='w-full text-xs flex justify-between items-start gap-y-1'>
                                        <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)}>
                                            {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                                                t('equipment.edit')
                                                :
                                                t('equipment.details')
                                            }
                                        </button>
                                        <button className={`${ButtonStyles.normalButton} ${loadingReturnEquipment && 'opacity-55'}`} disabled={loadingReturnEquipment} onClick={handleReturnEquipment(equipment.id)}>
                                            {t('equipment.return')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
        
                    {/* History */}
                    {
                        userEquipmentsHistoryData &&
                        userEquipmentsHistoryData.data.length > 0 &&
                        <DropDownLine
                            onClickActivation={() => handleDropDownClick('History')}
                            title={t('equipment.history')}
                            isActive={openDropDowns.includes('History')}
                        />
                    }
                    <div className='w-full flex flex-col items-center gap-4 md:grid md:grid-cols-2'>
                        {
                            openDropDowns.includes('History') &&
                            userEquipmentsHistoryData &&
                            userEquipmentsHistoryData.data &&
                            userEquipmentsHistoryData.data.map((equipment, index) =>
                                <div key={index} className='w-full flex flex-col gap-4'>
                                    <div key={equipment.id} className={`w-full justify-between items-center px-2 py-4 rounded-[34px] flex gap-y-4 md:col-span-1 bg-bgCard`}
                                        style={{ boxShadow: 'var(--shadow-all)' }}>
                                        <div className='w-auto text-xs flex flex-col justify-between items-start gap-y-2'>
                                            <p className='text-start'>
                                                {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                                                {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                                            </p>
                                            <p>{t('equipment.serialNumber', { serialNumber: equipment.serialNumber })}</p>
                                        </div>
                                        <div className='w-auto text-xs flex justify-between items-start gap-y-1'>
                                            <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)}>
                                                {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                                                    t('equipment.edit')
                                                    :
                                                    t('equipment.details')
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
        
                <Link to={isForClub ? AddEquipmentRouteBasedOnThePageForClub : AddEquipmentRouteBasedOnThePage} className='z-20 fixed bottom-[4rem] w-[90%] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4'>
                    <div className="relative z-10">
                        <button className={`${ButtonStyles.addButton} w-full`}>
                            <AddIcon />
                            <p>{t('equipment.addNew')}</p>
                        </button>
                    </div>
                    {
                        !isDesktop &&
                        <div className='bg-bgPageMain opacity-85 h-8 w-full -mt-4 relative z-0' />
                    }
                </Link>
            </div>
        );        
};

export default EquipmentsList;