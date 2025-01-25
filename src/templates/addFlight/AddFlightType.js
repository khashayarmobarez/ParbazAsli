import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import boxStyles from '../../styles/DataBox.module.css'

// queries
import { usePracticalActivityTypes } from '../../Utilities/Services/addFlightQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight, updateCourseName, updateWingType, updateFlightType, updateCourseId,  updateFlightCount, updateCourseLevel, updateClubName, updateCoachName, resetFlightDataExceptType, updateActivityType, updateHasNecessaryFlightEquipment, updateHasNecessaryGroundHandlingEquipments, updateFlightEquipmentValidationError, updateGroundHandlingEquipmentValidationError, updateInvalidFlightEquipmentType, updateInvalidGroundHandlingEquipmentType, updateGroundHandlingCount } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// comps
import StandardPopup from '../../components/reuseable/StandardPopup';
import Attention from '../../components/icons/Attention';
import ActivityTypeLogPopUp from '../../modules/addFlight/ActivityTypeLogPopUp';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AddFlightType = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // redux, the first line are this page datas and the second line is for checking the form to be complete
    const { flightType } = useSelector(selectAddFlight)

    const flightTypeRef = useRef(flightType)

    const [showErrorPopUp, setShowErrorPopUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [showSelectActivityTypePopUp, setShowSelectActivityTypePopUp] = useState(false)

    // redux
    const { 
        hasNecessaryGroundHandlingEquipments, 
        hasNecessaryFlightEquipments,
        flightEquipmentValidationError,
        groundHandlingEquipmentValidationError,
        invalidFlightEquipmentType,
        invalidGroundHandlingEquipmentType,
    } = useSelector(selectAddFlight)

    const { data: flightTypesData } = usePracticalActivityTypes()
    

    const handleSelectSetFlightType = (flightType) => {

        if( flightType.type !== flightTypeRef.current) {
            // reseting the data
            dispatch(resetFlightDataExceptType());
        }

        // check if the user lack the equipments
        dispatch(updateHasNecessaryFlightEquipment(flightType.hasNecessaryFlightEquipment));
        dispatch(updateHasNecessaryGroundHandlingEquipments(flightType.hasNecessaryGroundHandlingEquipment));

        // save the error message for equipments
        dispatch(updateFlightEquipmentValidationError(flightType.flightEquipmentValidationError));
        dispatch(updateGroundHandlingEquipmentValidationError(flightType.groundHandlingEquipmentValidationError));
        
        // the equipment that needs to be added type
        dispatch(updateInvalidFlightEquipmentType(flightType.invalidFlightEquipmentType));
        dispatch(updateInvalidGroundHandlingEquipmentType(flightType.invalidGroundHandlingEquipmentType));


        // dispatchin base data to redux
        dispatch(updateFlightType(flightType.type));
        dispatch(updateWingType(flightType.wingType));
        dispatch(updateFlightCount(flightType.flightCount));
        dispatch(updateGroundHandlingCount(flightType.groundHandlingCount));

        if(flightType.type === 'Course') {
            // dispatching course data
            dispatch(updateCourseId(flightType.userCourseId));
            dispatch(updateClubName(flightType.club));
            dispatch(updateCoachName(flightType.coach));
            dispatch(updateCourseLevel(flightType.level));
            dispatch(updateCourseName(flightType.name));
        }

        if(flightType.type !== 'Course') {
            dispatch(updateCourseId(''));
        }

        setShowSelectActivityTypePopUp(true)
    };

    const handleSetActivityType = (type) => {

        dispatch(updateActivityType(type))


        // lack of equipment error handling
        if(type === 'flight' && !hasNecessaryFlightEquipments) {
            setErrorMessage(flightEquipmentValidationError)
        } else if(type === 'groundHandling' && !hasNecessaryGroundHandlingEquipments) {
            setErrorMessage(groundHandlingEquipmentValidationError)
        }
        
        // navigating to log activity based on the user choice
        if(type === 'flight' && hasNecessaryFlightEquipments) {
            navigate('/addFlight/UploadIgc')
            return
        } else if(type === 'groundHandling' && hasNecessaryGroundHandlingEquipments) {
            navigate('/addFlight/AddGroundHandlingEquipment')
            return
        } else {
            setShowErrorPopUp(true)
            setShowSelectActivityTypePopUp(false)
        }

    }


    const handleNavigateToEquipment = () => {
        navigate('/equipment/flightEquipment')
    }



    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t('addFlight.addFlightType.pageTitle')} navigateTo={'/profile'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                    {
                        flightTypesData &&
                        flightTypesData?.data.length < 1 &&
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center col-span-2'>
                            <span className='w-14 h-14 mb-2'>
                                <Attention />
                            </span>
                            <p className='mb-6'>{t('addFlight.addFlightType.waitingForCoachTitle')}</p>
                            <p>{t('addFlight.addFlightType.waitingForCoachMessage')}</p>
                        </div>
                    }

                    {
                        flightTypesData &&
                        flightTypesData?.data.length > 0 &&
                        <>
                            <h1 className='text-sm'>{t('addFlight.addFlightType.selectFlightType')}</h1>

                            <div className='w-full flex flex-col items-center gap-y-6 md:grid md:grid-cols-2 md:gap-6'>


                                {
                                    flightTypesData.data.map((flightType, index) => (
                                        <div key={index} className={`${boxStyles.containerDarkmode} w-full rounded-[34px] min-h-16 z-0 md:w-full flex flex-col justify-between items-center p-4 gap-y-4 text-sm`}
                                        onClick={() => handleSelectSetFlightType(flightType)}>
                                            <div className='w-full flex justify-between'>
                                                <div className='w-full flex justify-start items-enter gap-x-2'>
                                                    {flightType.type === 'Course' ?
                                                        <div className=' w-4 h-4 rounded-full' style={{background:'var(--text-accent)'}} />
                                                        : 
                                                        <div className=' w-4 h-4 rounded-full' style={{background:'var(--text-disabled)'}} />
                                                    }
                                                    <p>{flightType.name}</p> 
                                                </div>
                                                {flightType.type === 'Course' && flightType.club &&
                                                <p>{t('addFlight.addFlightType.clubName')} {flightType.club}</p>
                                                }   
                                            </div>
                                            {flightType.type === 'Course' &&
                                                <div className='flex justify-start w-full'>
                                                    <p className='text-xs text-nowrap'>{t('addFlight.addFlightType.coachName')} {flightType.coach}</p>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }


                </div>

            </div>

            <ActivityTypeLogPopUp
                showPopup={showSelectActivityTypePopUp}
                setShowPopup={setShowSelectActivityTypePopUp}
                handleClick={handleSetActivityType}
            />

            <StandardPopup 
                showPopup={showErrorPopUp} 
                setShowPopup={setShowErrorPopUp} 
                topicText={'ثبت تجهیزات'}
                isFormWithOneButton={true}
                explanationtext={errorMessage}
                submitText={'تجهیزات'}
                handleSubmit={handleNavigateToEquipment}
            />

        </div>
    );
};

export default AddFlightType;