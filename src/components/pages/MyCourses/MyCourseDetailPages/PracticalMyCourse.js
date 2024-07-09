import React, { useEffect } from 'react';

// queries
import { useUserCourseFlights } from '../../../../Utilities/Services/StudentCoursesQueries';
import { useParams } from 'react-router-dom';
import PracticalFlightHistoryBox from '../MyComponents/PracticalFlightHistoryBox';

const PracticalMyCourse = () => {

    const { id } = useParams();

    const { data: userFlights, isLoading: userFlightsLoading } = useUserCourseFlights(id,1,5);

    useEffect(() => {
        if(userFlights) {
            console.log(userFlights)
        }
    }, [userFlights])

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>
            {userFlights && userFlights.totalCount === 0 &&
                <p> هنوز پروازی برای این دوره ثبت نشده است</p>
            }
            {
                userFlights && userFlights.totalCount === 0 &&
                <PracticalFlightHistoryBox />
            }
        </div>
    );
};

export default PracticalMyCourse;