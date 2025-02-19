import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// queries
import { useNotifications } from '../../Utilities/Services/notificationAndSurveyQueries';

// icons
import ArrowButton from '../../elements/icons/ArrowButton';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import NotifVersionStudentFlightForm from '../../modules/Notifications/NotifVersionStudentFlightForm';
import NotifAcceptClub from '../../modules/Notifications/NotifAcceptClub';
import NotifAcceptCourse from '../../modules/Notifications/NotifAcceptCourse';
import NotifAcceptStudent from '../../modules/Notifications/NotifAcceptStudent';
import RegularTextNotif from '../../modules/Notifications/RegularTextNotif';
import NotifTandemPassengerSurvey from '../../modules/Notifications/NotifTandemPassengerSurvey';
import PopupForNotif from '../../modules/Notifications/PopupForNotif';
import NotifAcceptEquipment from '../../modules/Notifications/NotifAcceptEquipment';
import Attention from '../../elements/icons/Attention';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import Pagination from '../../elements/reuseable/Pagination';


const Notifications = () => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    const [PageNumber, setPageNumber ] = useState(1)

    const [popUpData, setPopUpData] = useState('')

    const {  data: notificationsData, isLoading: notificationsLoading, error: notificationsError, refetch: refetchNotifications } = useNotifications(PageNumber,7);



    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-4 md:w-[60%] lg:w-[55%]'>

                <PageTitle title={t('notifications.title')} paddingRight={'40%'} />

                {
                    notificationsData?.data.length < 1 && !notificationsLoading && !notificationsError &&
                    <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                        <span className='w-14 h-14 mb-2'>
                            <Attention />
                        </span>
                        <p>{t('notifications.noNotifications')}</p>
                    </div>
                }

                <div className='w-[90%] flex flex-col gap-y-4 lg:mt-6'>

                    {   notificationsData &&
                        notificationsData.data?.map((notif, index) => (
                        <div className='w-full flex justify-center' key={index}>

                            {   notif.type === 'StudentPracticalActivityForm' &&
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

                <Pagination
                    totalPagesCount={notificationsData?.totalPagesCount} 
                    totalCount={notificationsData?.totalCount}
                    setPageNumber={setPageNumber}
                    PageNumber={PageNumber}
                    refetch={refetchNotifications}
                />
                
            </div>

            <PopupForNotif popUpData={popUpData} setPopUpData={setPopUpData} />
            
        </div>
    );
};

export default Notifications;