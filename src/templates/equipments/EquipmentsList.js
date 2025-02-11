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

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import EquipmentCard from '../../modules/Equipment page comps/EquipmentCard';
import EquipmentCardTemporary from '../../modules/Equipment page comps/EquipmentCardTemporary';
import EquipmentCardHistory from '../../modules/Equipment page comps/EquipmentCardHistory';

const EquipmentsList = () => {

    // language
    const { t } = useTranslation();

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
                            position: 'top-center',
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
                            position: 'top-center',
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
                            position: 'top-center',
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
                            position: 'top-center',
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
                        position: 'top-center',
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
                                <EquipmentCard
                                    key={index}
                                    equipment={equipment}
                                    equipmentType={equipmentType}
                                    handleEditEquipment={handleEditEquipment}
                                    handlePossession={handlePossession}
                                    handleSubmittingTransfer={handleSubmittingTransfer}
                                    loadingTriggerEquipmentStatus={loadingTriggerEquipmentStatus}
                                />
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
                            <EquipmentCardTemporary
                                key={index}
                                equipment={equipment}
                                equipmentType={equipmentType}
                                handleEditEquipment={handleEditEquipment}
                                loadingReturnEquipment={loadingReturnEquipment}
                                handleReturnEquipment={handleReturnEquipment}
                            />
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
                                <EquipmentCardHistory
                                    key={index}
                                    equipment={equipment}
                                    equipmentType={equipmentType}
                                    handleEditEquipment={handleEditEquipment}
                                />
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