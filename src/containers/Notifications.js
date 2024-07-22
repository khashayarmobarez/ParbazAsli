import React, { useEffect, useState } from 'react';

// queries
import { useNotifications } from '../Utilities/Services/notificationAndSurveyQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import NotifVersionStudentFlightForm from '../components/pages/Notifications/NotifVersionStudentFlightForm';
import NotifAcceptClub from '../components/pages/Notifications/NotifAcceptClub';
import NotifAcceptCourse from '../components/pages/Notifications/NotifAcceptCourse';
import NotifAcceptStudent from '../components/pages/Notifications/NotifAcceptStudent';
import RegularTextNotif from '../components/pages/Notifications/RegularTextNotif';
import NotifTandemPassengerSurvey from '../components/pages/Notifications/NotifTandemPassengerSurvey';


const Notifications = () => {

    const [pageSize, setPageSize ] = useState(20)

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
                            {   notif.type === 'AcceptStudentInCourse' &&
                                <NotifAcceptStudent key={index} notif={notif} />
                            }
                            {
                                notif.type === 'AcceptClub' &&
                                <NotifAcceptClub key={index} notif={notif} />
                            }
                            {
                                notif.type === 'AcceptCourse' &&
                                <NotifAcceptCourse key={index} notif={notif} />
                            }
                            {
                                notif.type === 'Regular' &&
                                <RegularTextNotif key={index} notif={notif} />
                            }
                            {
                                notif.type === 'TandemPassenger' &&
                                <NotifTandemPassengerSurvey key={index} notif={notif} />
                            }
                        </div>
                    ))}
                </div>
                
            </div>
            
        </div>
    );
};

export default Notifications;