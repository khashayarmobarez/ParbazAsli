import React from 'react';

// components
import StudentBox from '../../reuseable/StudentBox';
import SearchInput from '../../inputs/SearchInput';

const ClubStudents = () => {
    return (
        <div className='w-[90%] flex flex-col justify-center gap-y-10 mt-4'>

            <SearchInput />
            <div className='w-ull flex flex-col'>
                <StudentBox title={'بگینر'} />
                <StudentBox title={'نوایس'} />
            </div>

        </div>
    );
};

export default ClubStudents;