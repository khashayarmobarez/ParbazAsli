import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { resetAllFilters, selectFlightFilter, updateCoachNameFilter, updateCountryFilter, updateCourseFilter, updateFlightStatusFilter, updateFlightTypeFilter, updateFromDateFilter, updateHarnessFilter, updateProvinceFilter, updateSiteFilter, updateToDateFilter, updateWingFilter } from '../../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// styles
import buttonStyles from '../../styles/ButtonsBox.module.css';

// assets
import WingIcon from '../../components/icons/WingIcon'
import HarnessIcon from '../../components/icons/HarnessIcon'
import LocationIcon from '../../components/icons/LocationIcon'
import EarthIcon from '../../components/icons/EarthIcon'
import ColorTagsIcon from '../../components/icons/ColorTagsIcon'
import ADressTag from '../../components/icons/ADressTag'
import UserIcon from '../../components/icons/UserIcon'


// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// queries
import { useUserEquipmentsForDropDown } from '../../Utilities/Services/equipmentQueries';
import { useAllUsersCoaches } from '../../Utilities/Services/userQueries';
import { useAllUserCoursesForDropdown } from '../../Utilities/Services/StudentCoursesQueries';
import { useCountries, useProvincesByCountryId, useSitesByProvinceId } from '../../Utilities/Services/addFlightQueries';

// providers
import { flightTypeOptions, flightStatusOptions } from '../../Utilities/Providers/dropdownInputOptions';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import DropdownInput from '../../components/inputs/DropDownInput';
import DateLastRepackInput from '../../components/inputs/DateInput';
import useDateFormat from '../../Utilities/Hooks/useDateFormat';
import SearchInputWithDropdown from '../../components/inputs/SearchInputWithDropdown';
import RadioButton from '../../components/inputs/RadioButton';


const FlightsAdvancedFilter = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { formatDate } = useDateFormat();

    const [resetDate, setResetDate] = useState(false)

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
        fromDateFilter,
        toDateFilter
    } = useSelector(selectFlightFilter)
    

    // user equipments data
    const { data: userWingsData, loading:userWingsLoading } = useUserEquipmentsForDropDown(2,false)
    const { data: userHarnessData, loading:userHarnessLoading } = useUserEquipmentsForDropDown(3,false)
    const { data: userCoachesData, loading:userCoachesLoading } = useAllUsersCoaches()
    const { data: userCoursesData, loading:userCoursesLoading } = useAllUserCoursesForDropdown()
    const { data: countriesData, loading:countriesLoading } = useCountries()
    const { data: provincesData, loading:provincesLoading } = useProvincesByCountryId(countryFilter ? countryFilter.id : '')
    const { data: flightSitesData, loading:flightSitesLoading } = useSitesByProvinceId(provinceFilter  && provinceFilter.id, countryFilter && countryFilter.id)
    
    const resetDateFunc = () => {
        setResetDate(true)
        setTimeout(() => setResetDate(false), 50);
        window.location.reload();
    }

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

    const handleSelectSetCountryFilter = (selectedOption) => {
        dispatch(updateCountryFilter(selectedOption));
        dispatch(updateProvinceFilter({name:'',id:''})); // Clear province filter
        dispatch(updateSiteFilter({name:'',id:''})); // Clear site filter
    };

    const handleSelectSetCityFilter = (selectedOption) => {
        dispatch(updateProvinceFilter(selectedOption));
    };

    const handleSelectSetSiteFilter = (selectedOption) => {
        dispatch(updateSiteFilter(selectedOption));
    };


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


    useEffect(() => {
        console.log(fromDateFilter, toDateFilter)
    }
    , [fromDateFilter, toDateFilter])

//     Create a function with two arguments that will return an array of the first n multiples of x.

// Assume both the given number and the number of times to count will be positive numbers greater than 0.

// Return the results as an array or list ( depending on language ).

// Examples
// countBy(1,10) === [1,2,3,4,5,6,7,8,9,10]
// countBy(2,5) === [2,4,6,8,10]


// function countBy(x, n) {
//   let z = [x];
    
    // for(let i = 0; i < n; i++) {
        // z.push(z[z.lenght - 1] + x)
    // } 
    
//   return z;
// }



    return (
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-6 lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={'فیلتر جست‌وجو'} navigateTo={-1} />

                {   (userWingsLoading || userHarnessLoading || userCoachesLoading || userCoursesLoading || countriesLoading) &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'10rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {
                    (userWingsData && userHarnessData && userCoachesData && userCoursesData && countriesData) &&

                    <>
                        <div className='w-[90%] flex flex-col gap-y-4'>
                    
                            {
                                userCoursesData && userCoursesData.data.length > 0 &&
                                <DropdownInput  id={'ddi1'} icon={<ADressTag/>} name={'دوره'} options={userCoursesData.data} selectedOption={courseFilter} handleSelectChange={handleSelectCourseFilter} />
                            }
                            
                            {
                                userWingsData && userHarnessData && userWingsData.data.length > 0 && userHarnessData.data.length > 0 &&
                                <>
                                    <DropdownInput id={'ddi1.2'} icon={<WingIcon/>} name={'بال'} options={userWingsData.data} selectedOption={wingFilter} handleSelectChange={handleSelectSetWingFilter} />

                                    <DropdownInput id={'ddi1.4'} icon={<HarnessIcon/>} name={'هارنس'} options={userHarnessData.data} selectedOption={harnessFilter} handleSelectChange={handleSelectSetHarnessFilter} />
                                </>
                            }


                            <DropdownInput id={'ddi3'} icon={<ColorTagsIcon/>} name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightTypeFilter} handleSelectChange={handleSelectFlightTypeFilter} />
                            
                            {
                                userCoachesData && userCoachesData.data.length > 0 &&
                                <DropdownInput id={'ddi4'} icon={<UserIcon/>} name={'نام مربی'} options={userCoachesData.data} selectedOption={coachNameFilter} handleSelectChange={handleSelectCoachNameFilter} />
                            }

                            <DropdownInput id={'ddi5'} icon={<ColorTagsIcon/>} name={' وضعیت پرواز'} options={flightStatusOptions} selectedOption={flightStatusFilter} handleSelectChange={handleSelectFlightStatusFilter} />


                            {
                                !resetDate &&
                                <>
                                    {/* the date picker component comes from equipment section */}
                                    <DateLastRepackInput name={'از تاریخ'}  onChange={handleFlightFromDateFilterChange} placeH={'از تاریخ'} />

                                    {/* the date picker component comes from equipment section */}
                                    <DateLastRepackInput name={'تا تاریخ'}  onChange={handleFlightToDateFilterChange} placeH={'تا تاریخ'} />
                                </>
                            }

                            {
                                countriesData && 
                                <DropdownInput id={'ddi2'} icon={<EarthIcon/>} name={'کشور'} options={countriesData.data} selectedOption={countryFilter} handleSelectChange={handleSelectSetCountryFilter} />
                            }

                            {
                                provincesData && !provincesLoading && (countryFilter && countryFilter.id) &&
                                (<SearchInputWithDropdown icon={<LocationIcon/>} name={'استان'} options={provincesData.data} selectedOption={provinceFilter} handleSelectChange={handleSelectSetCityFilter} />)
                            }

                            {/* <RadioButton buttonText={'بین همه فعالیت‌ها جست و جو کن'} />

                            <RadioButton buttonText={'فقط بین پروازها جست و جو کن'} /> */}

                            {
                                flightSitesData && !flightSitesLoading && provinceFilter && provinceFilter.id &&
                                (<SearchInputWithDropdown icon={<LocationIcon/>} name={'سایت'} options={flightSitesData.data} selectedOption={siteFilter} handleSelectChange={handleSelectSetSiteFilter} />)
                            }

                            {/* <RadioButton buttonText={'فقط بین تمرین‌های زمینی جست و جو کن'} /> */}

                        </div>


                        <div className='w-[90%] md:w-[65%] flex justify-between gap-x-[6%] mt-2'>
                            <button onClick={() => {dispatch(resetAllFilters()); resetDateFunc()}} className={` ${buttonStyles.normalButton} w-full h-12`}>حذف فیلترها</button>
                            <button onClick={() => navigate('/flightHistory')} className={` ${buttonStyles.addButton} w-full h-12`}>اعمال فیلتر</button>
                        </div>
                    </>
                    
                }

            
            </div>
            
        </div>
    );
};

export default FlightsAdvancedFilter;