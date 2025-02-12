import React from 'react';

// components
import PageTitle from '../../../elements/reuseable/PageTitle';
import SearchInput from '../../../elements/inputs/SearchInput';

// styles
import ButtonStyles from '../../../styles/ButtonsBox.module.css'
import FlightDetailsBox from '../../../elements/reuseable/FlightDetailsBox';




const StudentDetails = () => {
    return (
        <div className='  mt-14 w-full flex flex-col items-center gap-y-7 pb-40'>

            {/* <PageTitle title={'جزئیات هنرجو '} navigateTo={'education'} paddingRight={'33%'} /> */}

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