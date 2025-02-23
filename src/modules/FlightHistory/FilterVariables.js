import React, { useEffect } from 'react';
import jalaali from 'jalaali-js';

// redux
import { selectFlightFilter, updateCoachNameFilter, updateCountryFilter, updateCourseFilter, updateFlightStatusFilter, updateFlightTypeFilter, updateFromDateFilter, updateHarnessFilter, updateProvinceFilter, updateSiteFilter, updateToDateFilter, updateWingFilter, updateActivityType, updateGroundHandlingTypeFilter } from '../../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

// mui
import ClearIcon from '@mui/icons-material/Clear';

const FilterVariables = () => {

    const dispatch = useDispatch();

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
        toDateFilter,
        groundHandlingTypeFilter,
        activityType
    } = useSelector(selectFlightFilter)

    function gregorianToShamsi(dateString) {
        if (!dateString) return '';
        const [month, day, year] = dateString.split('/').map(Number);
        const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
        return `${jy}/${jm}/${jd}`;
    }

    const shamsifromDateDate = fromDateFilter ? gregorianToShamsi(fromDateFilter) : '';
    const shamsiToDateDate = toDateFilter ? gregorianToShamsi(toDateFilter) : '';


    const handleRemoveFilter = (filter) => {
        switch(filter) {
            case 'courseFilter':
                dispatch(updateCourseFilter(''));
                break;
            case 'wingFilter':
                dispatch(updateWingFilter(''));
                break;
            case 'harnessFilter':
                dispatch(updateHarnessFilter(''));
                break;
            case 'countryFilter':
                dispatch(updateCountryFilter(''));
                break;
            case 'provinceFilter':
                dispatch(updateProvinceFilter(''));
                break;
            case 'siteFilter':
                dispatch(updateSiteFilter(''));
                break;
            case 'flightTypeFilter':
                dispatch(updateFlightTypeFilter(''));
                break;
            case 'groundHandlingTypeFilter':
                dispatch(updateGroundHandlingTypeFilter(''));
                break;
            case 'coachNameFilter':
                dispatch(updateCoachNameFilter(''));
                break;
            case 'flightStatusFilter':
                dispatch(updateFlightStatusFilter(''));
                break;
            case 'fromDateFilter':
                dispatch(updateFromDateFilter(''));
                break;
            case 'toDateFilter':
                dispatch(updateToDateFilter(''));
                break;
            case 'activityType':
                dispatch(updateActivityType(''));
                break;
            default:
                break;
        }
    }

    // reset all redux data

   
    
    return (
        <div className={`w-full flex 
        ${!courseFilter &&
        !wingFilter &&
        !harnessFilter &&
        !countryFilter &&
        !provinceFilter &&
        !siteFilter &&
        !flightTypeFilter &&
        !coachNameFilter &&
        !flightStatusFilter &&
        !fromDateFilter &&
        !toDateFilter &&
        !activityType && '-mt-10 -z-10'}`} >
            <ul className=' w-full py-0 -mt-6 -mb-4 grid grid-cols-3 gap-2'>

                {   
                    courseFilter &&
                    courseFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{courseFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('courseFilter')} />
                        </li>
                }

                {
                    activityType &&
                    activityType.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{activityType.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('activityType')} />
                        </li>
                }

                {   
                    wingFilter &&
                    wingFilter.brand &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{wingFilter.brand} - {wingFilter.model.slice(0,10)}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('wingFilter')} />
                        </li>
                }

                {
                    harnessFilter &&
                    harnessFilter.brand &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{harnessFilter.brand} - {harnessFilter.model.slice(0,10)}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('harnessFilter')} />
                        </li>
                }

                {
                    countryFilter &&
                    countryFilter.name &&
                    !provinceFilter.name &&
                    !siteFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{countryFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('countryFilter')} />
                        </li>
                }

                {
                    provinceFilter &&
                    provinceFilter.name &&
                    !siteFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{provinceFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('provinceFilter')} />
                        </li>
                }

                {
                    siteFilter &&
                    siteFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{siteFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('siteFilter')} />
                        </li>
                }

                {
                    flightTypeFilter &&
                    flightTypeFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{flightTypeFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('flightTypeFilter')} />
                        </li>
                }

                {
                    groundHandlingTypeFilter &&
                    groundHandlingTypeFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{groundHandlingTypeFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('groundHandlingTypeFilter')} />
                        </li>
                }

                {
                    coachNameFilter &&
                    coachNameFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{coachNameFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('coachNameFilter')} />
                        </li>
                }

                {
                    flightStatusFilter &&
                    flightStatusFilter.name &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{flightStatusFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('flightStatusFilter')} />
                        </li>
                }

                {
                    shamsifromDateDate &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{shamsifromDateDate}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('fromDateFilter')} />
                        </li>
                }

                {
                    shamsiToDateDate &&
                        <li className=' col-span-1 p-1 bg-bgButtonProfileDefault rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{shamsiToDateDate}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('toDateFilter')} />
                        </li>
                }
            </ul>
        </div>
    );
};

export default FilterVariables;