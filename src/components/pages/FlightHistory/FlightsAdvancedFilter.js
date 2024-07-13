import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFlightFilter, updateCoachNameFilter, updateCourseFilter, updateFlightStatusFilter, updateFlightTypeFilter, updateFromDateFilter, updateHarnessFilter, updateToDateFilter, updateWingFilter } from '../../../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// queries
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';
import { useAllUsersCoaches } from '../../../Utilities/Services/userQueries';
import { useAllUserCoursesForDropdown } from '../../../Utilities/Services/StudentCoursesQueries';

// providers
import { flightTypeOptions, flightStatusOptions } from '../../../Utilities/Providers/dropdownInputOptions';

// components
import PageTitle from '../../reuseable/PageTitle';
import DropdownInputForEquipment from '../AddFlight/Components/DropDownInputForEquipment';
import DropdownInput from '../../inputs/DropDownInput';
import DateLastRepackInput from '../Equipment page comps/inputsForEquipment/DateLastRepackInput';
import useDateFormat from '../../../Utilities/Hooks/useDateFormat';

const FlightsAdvancedFilter = () => {

    const dispatch = useDispatch()
    const { formatDate } = useDateFormat();

    // redux
    const { 
        courseFilter,
        wingFilter,
        harnessFilter,
        countryFilter,
        provinceFilter,
        siteFilter,
        flightTypeFilter,
        coachNameFilter,
        flightStatusFilter,
        // fromDateFilter,
        // toDateFilter
    } = useSelector(selectFlightFilter)
    

    // user equipments data
    const { data: userWingsData, loading:userWingsLoading, error:userWingsError } = useUserEquipments(2)
    const { data: userHarnessData, loading:userHarnessLoading, error:userHarnessError } = useUserEquipments(3)
    const { data: userCoachesData, loading:userCoachesLoading, error:userCoachesError } = useAllUsersCoaches()
    const { data: userCoursesData, loading:userCoursesLoading, error:userCoursesError } = useAllUserCoursesForDropdown()


    const handleSelectCourseFilter = (selectedOption) => {
        dispatch(updateCourseFilter(selectedOption));
    };

    const handleSelectSetWingFilter = (selectedOption) => {
        dispatch(updateWingFilter(selectedOption));
    };

    const handleSelectSetHarnessFilter = (selectedOption) => {
        dispatch(updateHarnessFilter(selectedOption));
    };

    const handleSelectFlightTypeFilter = (selectedOption) => {
        dispatch(updateFlightTypeFilter(selectedOption));
    };

    const handleSelectCoachNameFilter = (selectedOption) => {
        dispatch(updateCoachNameFilter(selectedOption));
    }

    const handleSelectFlightStatusFilter = (selectedOption) => {
        dispatch(updateFlightStatusFilter(selectedOption));
    }


    const handleFlightFromDateFilterChange = (value) => {

        const formattedFromDate = formatDate(value);
        dispatch(updateFromDateFilter(formattedFromDate));

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleFlightToDateFilterChange = (value) => {

        const formattedToDate = formatDate(value);
        dispatch(updateToDateFilter(formattedToDate));

        // function to close the datePicker
        clickOnRightSide()
    }

    // function to close the datePicker
    const clickOnRightSide = () => {
        // Create a new mouse event
        const clickEvent = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 1, // Right edge of the screen
            clientY: window.innerHeight / 2 // Middle of the screen vertically
        });

        // Dispatch the event to the document
        document.dispatchEvent(clickEvent);
    };



    return (
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-8'>

            <PageTitle title={'فیلتر جست‌وجو'} navigateTo={-1} />

            <div className='w-[90%] md:w-[65%] flex flex-col gap-y-4'>

                {
                    userCoursesData && userCoursesData.data.length > 0 &&
                    <DropdownInput name={'دوره'} options={userCoursesData.data} selectedOption={courseFilter} handleSelectChange={handleSelectCourseFilter} />
                }
                
                {
                    userWingsData && userHarnessData && userWingsData.data.length > 0 && userHarnessData.data.length > 0 &&
                    <>
                        <DropdownInputForEquipment name={'بال'} options={userWingsData.data} selectedOption={wingFilter} handleSelectChange={handleSelectSetWingFilter} />

                        <DropdownInputForEquipment name={'هارنس'} options={userHarnessData.data} selectedOption={harnessFilter} handleSelectChange={handleSelectSetHarnessFilter} />
                    </>
                }

                <DropdownInput name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightTypeFilter} handleSelectChange={handleSelectFlightTypeFilter} />
                
                {
                    userCoachesData && userCoachesData.data.length > 0 &&
                    <DropdownInput name={'نام مربی'} options={userCoachesData.data} selectedOption={coachNameFilter} handleSelectChange={handleSelectCoachNameFilter} />
                }

                <DropdownInput name={' وضعیت پرواز'} options={flightStatusOptions} selectedOption={flightStatusFilter} handleSelectChange={handleSelectFlightStatusFilter} />


                {/* the date picker component comes from equipment section, try moving it into this component */}
                <DateLastRepackInput name={'از تاریخ'}  onChange={handleFlightFromDateFilterChange} placeH={'از تاریخ'} />

                {/* the date picker component comes from equipment section, try moving it into this component */}
                <DateLastRepackInput name={'تا تاریخ'}  onChange={handleFlightToDateFilterChange} placeH={'تا تاریخ'} />

            
            </div>

            
            </div>
            
        </div>
    );
};

export default FlightsAdvancedFilter;