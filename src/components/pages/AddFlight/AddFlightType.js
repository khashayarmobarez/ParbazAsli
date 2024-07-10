import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'

// queries
import { useFlightTypes } from '../../../Utilities/Services/addFlightQueries';

// components
import PageTitle from '../../reuseable/PageTitle';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateFlightType, updateCourseId } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

const AddFlightType = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { flightType, courseId } = useSelector(selectAddFlight)

    const { data: flightTypesData, loading:flightTypesLoading, error:flightTypesError } = useFlightTypes()
    

    const handleSelectSetFlightType = (type, theCourseId) => {
        dispatch(updateFlightType(type));
        if(type === 'Course') {
            dispatch(updateCourseId(theCourseId));
        }

        if(type !== 'Course') {
            dispatch(updateCourseId(''));
        }

        navigate('/addFlight/UploadIgc')

        console.log(flightType, courseId)
    };

    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className='w-full flex flex-col items-center gap-y-6'>

                <PageTitle title={'ثبت پرواز'} navigateTo={'/profile'} />

                <h1 className='text-sm'>نوع یا دوره پروازی خود را انتخاب کنید</h1>

                <div className='w-full flex flex-col items-center gap-y-6'>
                    {
                        flightTypesData &&
                        flightTypesData.data.map((flightType, index) => (
                            <div key={index} className={`${boxStyles.containerDarkmode} w-[90%] rounded-3xl min-h-16 z-0 md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-2 text-sm`}
                            onClick={() => handleSelectSetFlightType(flightType.type,flightType.userCourseId)}>
                                <div className='w-full flex justify-between'>
                                    <div className='w-full flex justify-start items-enter gap-x-2'>
                                        {flightType.type === 'Course' ?
                                            <div className=' w-4 h-4 rounded-full' style={{background:'var(--yellow-text)'}} />
                                            : 
                                            <div className=' w-4 h-4 rounded-full' style={{background:'var(--diffrential-blue)'}} />
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
    );
};

export default AddFlightType;