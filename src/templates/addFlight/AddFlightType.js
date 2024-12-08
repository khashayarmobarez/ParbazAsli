import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'

// queries
import { useFlightTypes } from '../../Utilities/Services/addFlightQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight, updateCourseName, updateWingType } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateFlightType, updateCourseId,  updateFlightCount, updateCourseLevel, updateClubName, updateCoachName, resetFlightDataExceptType } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';


const AddFlightType = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // redux, the first line are this page datas and the second line is for checking the form to be complete
    const { flightType } = useSelector(selectAddFlight)

    const flightTypeRef = useRef(flightType)

    const { data: flightTypesData, loading:flightTypesLoading, error:flightTypesError } = useFlightTypes()
    

    const handleSelectSetFlightType = (flightType) => {

        if( flightType.type !== flightTypeRef.current) {
            dispatch(resetFlightDataExceptType());
        }

        dispatch(updateFlightType(flightType.type));
        dispatch(updateWingType(flightType.wingType));
        dispatch(updateFlightCount(flightType.flightsCount));

        if(flightType.type === 'Course') {
            dispatch(updateCourseId(flightType.userCourseId));
            dispatch(updateClubName(flightType.club));
            dispatch(updateCoachName(flightType.coach));
            dispatch(updateCourseLevel(flightType.level));
            dispatch(updateCourseName(flightType.name));
        }

        if(flightType.type !== 'Course') {
            dispatch(updateCourseId(''));
        }

        navigate('/addFlight/UploadIgc')
    };



    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12'>

                <PageTitle title={'ثبت پرواز'} navigateTo={'/profile'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                    <h1 className='text-sm'>نوع یا دوره پروازی خود را انتخاب کنید</h1>

                    <div className='w-full flex flex-col items-center gap-y-6 md:grid md:grid-cols-2 md:gap-6'>
                        {
                            flightTypesData &&
                            flightTypesData.data.map((flightType, index) => (
                                <div key={index} className={`${boxStyles.containerDarkmode} w-full rounded-3xl min-h-16 z-0 md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-2 text-sm`}
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
                                        <p>باشگاه: {flightType.club}</p>
                                        }   
                                    </div>
                                    {flightType.type === 'Course' &&
                                        <div className='flex justify-start w-full'>
                                            <p className='text-xs text-nowrap'>مربی: {flightType.coach}</p>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddFlightType;