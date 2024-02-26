import React from 'react';
import PageTitle from '../../reuseable/PageTitle';
import SearchInput from '../../inputs/SearchInput';

const StudentDetails = () => {
    return (
        <div className=' mt-14 w-full flex flex-col justify-center'>
            <PageTitle title={'سوابق  رضا نظری'} navigateTo={'education'} paddingRight={'33%'} />

            <SearchInput />


        </div>
        );
    };
    
    export default StudentDetails;