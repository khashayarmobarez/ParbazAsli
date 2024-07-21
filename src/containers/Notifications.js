import React, { useEffect, useState } from 'react';

// queries
import { useNotifications } from '../Utilities/Services/notificationAndSurveyQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import NotifVersion1 from '../components/pages/Notifications/NotifVersion1';
import NotifVersion2 from '../components/pages/Notifications/NotifVersion2';


const Notifications = () => {

    const [pageSize, setPageSize ] = useState(10)

    const {  data: clubCoachesData, isLoading: coachesDataLoading, error: coachesDataError } = useNotifications(1,pageSize);

    useEffect(() => {
        if(clubCoachesData) {
            console.log(clubCoachesData)
        }
    }, [clubCoachesData])

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>

                <PageTitle title={'اعلانات'} paddingRight={'40%'} />

                <div className='w-[90%] flex flex-col space-y-6'>
                    <NotifVersion1 />
                    <NotifVersion2 />
                </div>
                
            </div>
            
        </div>
    );
};

export default Notifications;