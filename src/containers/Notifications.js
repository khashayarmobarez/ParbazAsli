import React, { useEffect, useState } from 'react';

// queries
import { useNotifications } from '../Utilities/Services/notificationAndSurveyQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import NotifVersionStudentFlightForm from '../components/pages/Notifications/NotifVersionStudentFlightForm';
import NotifVersionAcceptStudentInCourse from '../components/pages/Notifications/NotifVersionAcceptStudentInCourse';


const Notifications = () => {

    const [pageSize, setPageSize ] = useState(10)

    const {  data: notificationsData, isLoading: notificationsLoading, error: notificationsError } = useNotifications(1,pageSize);

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>

                <PageTitle title={'اعلانات'} paddingRight={'40%'} />

                <div className='w-[90%] flex flex-col space-y-6'>

                    {   notificationsData &&
                        notificationsData.data.map((notif, index) => (
                        <div className='w-full flex justify-center' key={index}>

                            {   notif.type === 'StudentFlightForm' &&
                                <NotifVersionStudentFlightForm key={index} notif={notif} />
                            }
                            {   notif.type === 'StudentFlightForm' &&
                                <NotifVersionAcceptStudentInCourse key={index} notif={notif} />
                            }
                        </div>
                    ))}
                </div>
                
            </div>
            
        </div>
    );
};

export default Notifications;