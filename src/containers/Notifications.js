import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// queries
import { useNotifications } from '../Utilities/Services/notificationAndSurveyQueries';

// icons
import ArrowButton from '../components/icons/ArrowButton';

// components
import PageTitle from '../components/reuseable/PageTitle';
import NotifVersionStudentFlightForm from '../components/pages/Notifications/NotifVersionStudentFlightForm';
import NotifAcceptClub from '../components/pages/Notifications/NotifAcceptClub';
import NotifAcceptCourse from '../components/pages/Notifications/NotifAcceptCourse';
import NotifAcceptStudent from '../components/pages/Notifications/NotifAcceptStudent';
import RegularTextNotif from '../components/pages/Notifications/RegularTextNotif';
import NotifTandemPassengerSurvey from '../components/pages/Notifications/NotifTandemPassengerSurvey';
import PopupForNotif from '../components/pages/Notifications/PopupForNotif';
import NotifAcceptEquipment from '../components/pages/Notifications/NotifAcceptEquipment';
import Attention from '../components/icons/Attention';


const Notifications = () => {

    const [PageNumber, setPageNumber ] = useState(1)

    const [popUpData, setPopUpData] = useState('')

    const {  data: notificationsData, isLoading: notificationsLoading, error: notificationsError, refetch: refetchNotifications } = useNotifications(PageNumber,7);


    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[60%]'>

                <PageTitle title={'اعلانات'} paddingRight={'40%'} />

                {
                    notificationsData.data.length < 1 && !notificationsLoading && !notificationsError &&
                    <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                        <span className='w-14 h-14 mb-2'>
                            <Attention />
                        </span>
                        <p>اعلانی یافت نشد</p>
                    </div>
                }

                <div className='w-[90%] flex flex-col space-y-6'>

                    {   notificationsData &&
                        notificationsData.data?.map((notif, index) => (
                        <div className='w-full flex justify-center' key={index}>

                            {   notif.type === 'StudentFlightForm' &&
                                <NotifVersionStudentFlightForm key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)} />
                            }
                            {   notif.type === 'AcceptStudentInCourse' &&
                                <NotifAcceptStudent key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)} />
                            }
                            {
                                notif.type === 'AcceptClub' &&
                                <NotifAcceptClub key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)} />
                            }
                            {
                                notif.type === 'AcceptCourse' &&
                                <NotifAcceptCourse key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)}/>
                            }
                            {
                                notif.type === 'Regular' &&
                                <RegularTextNotif key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)}/>
                            }
                            {
                                notif.type === 'TandemPassenger' &&
                                <NotifTandemPassengerSurvey key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)}/>
                            }
                            {
                                (notif.type === 'AcceptUserEquipment' || notif.type === 'AcceptClubEquipment') &&
                                <NotifAcceptEquipment isForClub={notif.type === 'AcceptClubEquipment'} key={index} notif={notif} handleActivatePopUp={() => setPopUpData(notif)} />
                            }
                        </div>
                    ))}
                </div>

                {   notificationsData && notificationsData.totalCount > 7 &&
                    <div className='w-full flex justify-between px-10 items-center'>
                        <button
                            className={`transform w-6 h-6 justify-self-end `}
                            disabled={PageNumber === 1}
                            onClick={handleLastPageNumber}
                        >
                            <ArrowButton isRight={true} isDisable={PageNumber === 1}/>
                        </button>

                        <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                            صفحه ی {PageNumber}
                        </p>

                        <button
                            className={`w-6 h-6 justify-self-start `}
                            disabled={notificationsData.totalPagesCount === 1 || notificationsData.totalPagesCount === PageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <ArrowButton isDisable={notificationsData.totalPagesCount === 1 || notificationsData.totalPagesCount === PageNumber}/>
                        </button>
                    </div>
                }
                
            </div>

            <PopupForNotif popUpData={popUpData} setPopUpData={setPopUpData} />
            
        </div>
    );
};

export default Notifications;