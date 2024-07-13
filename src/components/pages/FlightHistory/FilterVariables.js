import React, { useEffect } from 'react';

// redux
import { selectFlightFilter, updateCoachNameFilter, updateCountryFilter, updateCourseFilter, updateFlightStatusFilter, updateFlightTypeFilter, updateFromDateFilter, updateHarnessFilter, updateProvinceFilter, updateSiteFilter, updateToDateFilter, updateWingFilter } from '../../../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';
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
        toDateFilter
    } = useSelector(selectFlightFilter)


    const handleRemoveFilter = (filter) => {
        switch(filter) {
            case 'courseFilter':
                dispatch(updateCourseFilter({name:'', id:''}));
                break;
            case 'wingFilter':
                dispatch(updateWingFilter({name:'', id:''}));
                break;
            case 'harnessFilter':
                dispatch(updateHarnessFilter({name:'', id:''}));
                break;
            case 'countryFilter':
                dispatch(updateCountryFilter({name:'', id:''}));
                break;
            case 'provinceFilter':
                dispatch(updateProvinceFilter({name:'', id:''}));
                break;
            case 'siteFilter':
                dispatch(updateSiteFilter({name:'', id:''}));
                break;
            case 'flightTypeFilter':
                dispatch(updateFlightTypeFilter({name:'', id:''}));
                break;
            case 'coachNameFilter':
                dispatch(updateCoachNameFilter({name:'', id:''}));
                break;
            case 'flightStatusFilter':
                dispatch(updateFlightStatusFilter({name:'', id:''}));
                break;
            case 'fromDateFilter':
                dispatch(updateFromDateFilter(''));
                break;
            case 'toDateFilter':
                dispatch(updateToDateFilter(''));
                break;
            default:
                break;
        }
    }
        
    
    return (
        <div className='w-full flex'>
            <ul className=' w-full py-0 mt-[-1rem] grid grid-cols-3 gap-2'>

                {
                    courseFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{courseFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('courseFilter')} />
                        </li>
                }

                {
                    wingFilter.brand &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{wingFilter.brand} - {wingFilter.model}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('wingFilter')} />
                        </li>
                }

                {
                    harnessFilter.brand &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{harnessFilter.brand} - {harnessFilter.model}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('harnessFilter')} />
                        </li>
                }

                {
                    countryFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{countryFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('countryFilter')} />
                        </li>
                }

                {
                    provinceFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{provinceFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('provinceFilter')} />
                        </li>
                }

                {
                    siteFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{siteFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('siteFilter')} />
                        </li>
                }

                {
                    flightTypeFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{flightTypeFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('flightTypeFilter')} />
                        </li>
                }

                {
                    coachNameFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{coachNameFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('coachNameFilter')} />
                        </li>
                }

                {
                    flightStatusFilter.name &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{flightStatusFilter.name}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('flightStatusFilter')} />
                        </li>
                }

                {
                    fromDateFilter &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{fromDateFilter}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('fromDateFilter')} />
                        </li>
                }

                {
                    toDateFilter &&
                        <li className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                            <p className=' text-xs mx-1' >{toDateFilter}</p>
                            <ClearIcon onClick={() => handleRemoveFilter('toDateFilter')} />
                        </li>
                }
            </ul>
        </div>
    );
};

export default FilterVariables;