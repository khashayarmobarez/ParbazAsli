import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// queries
import { useFlightTypes } from '../../../Utilities/Services/addFlightQueries';

// components
import PageTitle from '../../reuseable/PageTitle';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateFlightType } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

const AddFlightType = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {  } = useSelector(selectAddFlight)

    const { data: flightTypesData, loading:flightTypesLoading, error:flightTypesError } = useFlightTypes()

    useEffect(() => {
        if(flightTypesData) {
            console.log(flightTypesData)
        }
    }, [flightTypesData])

    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className='w-full flex flex-col items-center gap-y-6'>

                <PageTitle title={'ثبت پرواز'} navigateTo={'/profile'} />

                <h1 className='text-sm'>نوع یا دوره پروازی خود را انتخاب کنید</h1>
                {
                    flightTypesData &&
                    flightTypesData.data.map((flightType, index) => (
                        <div key={index} className='w-[90%] h-[70px] bg-white rounded-xl flex justify-between items-center px-4 shadow-md mt-4'>
                            <p>{flightType.FlightType}</p> 
                            <button className='text-white bg-blue-500 px-4 py-1 rounded-xl' onClick={() => navigate('/addFlight/addSituation')}>انتخاب</button>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default AddFlightType;