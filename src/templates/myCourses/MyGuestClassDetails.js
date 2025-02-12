import React from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useAGuestUserClass } from '../../Utilities/Services/StudentCoursesQueries';

// styles
import boxStyles from '../../styles/DataBox.module.css'

// comps
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';
import PageTitle from '../../elements/reuseable/PageTitle';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const MyGuestClassDetails = () => {
    
    // language
    const { t } = useTranslation();

    const { id } = useParams();

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useAGuestUserClass(id);

    return (
        <div className='flex flex-col mt-14 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%]'>

                <PageTitle title={t("myCourses.guestCourseDetails.courseDetails")} navigateTo={'/MyCourses'} /> 
            
                {
                    courseDataLoading &&
                    <CircularProgressLoader />
                }

                {
                    courseDataError &&
                    <p className='w-full text-center'>{t("myCourses.guestCourseDetails.errorMessage")}</p>
                }

                {
                    aCourseData &&
                    <>
                        <div className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col items-center py-6 gap-y-8`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-14 md:gap-y-0'>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>{t("myCourses.guestCourseDetails.name")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>


                                {
                                    aCourseData.data.classDuration &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.guestCourseDetails.duration")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.classDuration}</p>
                                        </div>  
                                    </div>
                                }

                                {
                                    aCourseData.data.startTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.guestCourseDetails.startTime")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.startTime}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.endTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.guestCourseDetails.endTime")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.endTime}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.dateTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.guestCourseDetails.date")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.dateTime}</p>
                                        </div>
                                    </div>
                                }
                                
                                {
                                    aCourseData.data.description &&
                                    <div className=' w-full flex flex-col items-start justify-between col-span-8 gap-y-2' >
                                            <p>{t("myCourses.guestCourseDetails.description")}</p>
                                            <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                                    </div>
                                }

                                {aCourseData.data.syllabi &&
                                    <div className='flex flex-col items-start gap-y-2 col-span-8'>
                                            <p className=' text-sm'>{t("myCourses.guestCourseDetails.topics")}</p>
                                            { 
                                                aCourseData.data.syllabi.map((syllabus, index) => (
                                                    <div key={index} className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                        <p>{syllabus.description}</p>
                                                    </div>
                                                ))
                                            }
                                    </div>
                                }   

                            </div>

                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default MyGuestClassDetails;