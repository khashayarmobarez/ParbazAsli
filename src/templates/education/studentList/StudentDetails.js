import React from 'react';

// components
import PageTitle from '../../../components/reuseable/PageTitle';
import SearchInput from '../../../components/inputs/SearchInput';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import FlightDetailsBox from '../../../components/reuseable/FlightDetailsBox';




const StudentDetails = () => {
    return (
        <div className='  mt-14 w-full flex flex-col items-center gap-y-7 pb-40'>

            <PageTitle title={'سوابق  رضا نظری'} navigateTo={'education'} paddingRight={'33%'} />

            <div className='w-[90%] flex flex-col gap-y-7'>
                
                <SearchInput />

                <FlightDetailsBox title={'مقطع مبتدی'} />

                <div className='w-full'>
                    <button className={ButtonStyles.normalButton}>مشاهده IGC</button>
                </div>
                
            </div>

        </div>
        );
    };
    
    export default StudentDetails;