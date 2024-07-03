import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// components
import PageTitle from '../../../reuseable/PageTitle';
import TextInput from '../../../inputs/textInput';
import TimeInput from '../../../inputs/TimeInput';

const AddClass = () => {

    const { id } = useParams();

    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
        // Do something with the new time value
    };

    return (
        <div className='w-full pt-14 flex justify-center '>
            <div className='w-[90%] flex flex-col items-center min-h-[100vh]'>

                <PageTitle title={'افزودن کلاس'} navigateTo={'/profile'} />

                <form className='w-[90%] flex flex-col items-center gap-y-6'>

                    {/* <TextInput
                    value={courseName}
                    onChange={handleCourseName}
                    placeholder='نام دوره'
                    /> */}

                    <TimeInput
                    value={selectedTime}
                    onChange={handleTimeChange}
                    placeholder="Select time"
                    />

                </form>

            </div>
        </div>
    );
};

export default AddClass;