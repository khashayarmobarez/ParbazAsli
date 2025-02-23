import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
    import Cookies from 'js-cookie';

// queries
import { useAStudentCourses } from '../../../Utilities/Services/coursesQueries';

// comps
import PageTitle from '../../../elements/reuseable/PageTitle';

// styles
import boxStyles from '../../../styles/DataBox.module.css'
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// assets
import ArrowButton from '../../../elements/icons/ArrowButton';

// mui
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Attention from '../../../elements/icons/Attention';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import Pagination from '../../../elements/reuseable/Pagination';

const AStudentCourses = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    
    const backButtonRoute = Cookies.get('lastStudentListPath');

    const { studentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isForClub = location.pathname.includes('/club')

    isForClub ?
        Cookies.set('lastPathForClubStudentDetails', location.pathname)
        : 
        Cookies.set('lastPathForStudentDetails', location.pathname);

    const [pageNumber, setPageNumber] = useState(1);
    let pageSize = 4;

    const { data: StudentCourses, refetch: reftchCourses } = useAStudentCourses(studentId && studentId, pageNumber, pageSize, isForClub);

    // refetch courses when pageNumber changed
    useEffect(() => {
        reftchCourses();
    }, [pageNumber]);

    const handleCourseDetails = (id) => () => {
        isForClub ?
            navigate(`/club/courseDetails/studentDetails/${id}/practical`)
            :
            navigate(`/education/courseDetails/studentDetails/${id}/practical`);
    };


    return (
        <div className='flex flex-col mt-14 items-center pb-14 gap-y-6'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%] '>
                <PageTitle 
                    title={StudentCourses ? `${StudentCourses.data[0].studentName}` : t("education.aStudentCourses.studentName") }
                    navigateTo={backButtonRoute}
                />

                <div className='w-[90%] flex flex-col gap-4 md:grid md:grid-cols-2 lg:mt-8'>
                    { StudentCourses?.data.length < 1 &&
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                            <span className='w-14 h-14 mb-2'>
                                <Attention />
                            </span>
                            <p>{t("education.aStudentCourses.noCourses")}</p>
                        </div>
                    }

                    { StudentCourses && StudentCourses.data?.map((courseData, index) => (
                        <div key={index} className='w-full flex flex-col items-center'>
                            <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>
                                <div className='w-full flex justify-between'>
                                    {/* conditional course name */}
                                    {(courseData.status === 'Active' || courseData.status === 'CoachPending') && <p className='text-base'>{courseData.name}</p>}
                                    {courseData.status === 'Completed' && <p className='text-base text-textAccent'>{courseData.name} ({t("education.aStudentCourses.courseCompleted")})</p>}
                                    {courseData.status === 'Canceled' && <p className='text-base text-textError'>{courseData.name} ({t("education.aStudentCourses.courseCanceled")})</p>}

                                    {/* conditional course percent */}
                                    {courseData.status === 'CoachPending' ? (
                                        <p className={` text-textWarning`}>
                                            {t("education.aStudentCourses.waitingForApproval")}
                                        </p>
                                    ) : (
                                        <p className={`
                                            ${courseData.status === 'Completed' && 'text-textAccent'}
                                            ${courseData.status === 'Canceled' && 'text-textError'}
                                            ${courseData.status === 'Active' && ''}
                                        `}>
                                            {courseData.percent}%
                                        </p>
                                    )}
                                </div>

                                {courseData.status !== 'CoachPending' && (
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                                            sx={{ 
                                                height: '1rem', 
                                                borderRadius: '1rem', 
                                                backgroundColor: 'var(--progress-bar-bg)', 
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 
                                                        courseData.status === 'Active' ? 'var(--text-warning)' :
                                                        courseData.status === 'Completed' ? 'var(--text-accent)' :
                                                        courseData.status === 'Canceled' ? 'var(--text-error)' :
                                                        'var(--text-warning)', // Optional: A default value if none of the conditions match
                                                }
                                            }} 
                                        />
                                    </Box>
                                )}

                                <div className='w-full flex justify-between text-start text-sm'>
                                    <div className={`flex flex-col justify-between self-start gap-y-2
                                        text-${courseData.status === 'Active' ? 'text-textDefault' :
                                        courseData.status === 'Completed' ? 'text-textButtonProfileDisable' :
                                        courseData.status === 'Canceled' ? 'text-textButtonProfileDisable' :
                                        'textDefault'}
                                    `}>
                                        {courseData.organization && courseData.type !== 'Regular' && (
                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`}>
                                                <span>{t("education.aStudentCourses.organization")}:&nbsp;</span>
                                                {courseData.organization}
                                            </p>
                                        )}
                                        {courseData.clubName && (
                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`}>
                                                <span>{t("education.aStudentCourses.clubName")}:&nbsp;</span>
                                                {courseData.clubName}
                                            </p>
                                        )}
                                        {courseData.coach && (
                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`}>
                                                <span>{t("education.aStudentCourses.coach")}:&nbsp;</span> 
                                                {courseData.coach}
                                            </p>
                                        )}
                                    </div>
                                    <button 
                                    onClick={handleCourseDetails(courseData.id)} 
                                    disabled={courseData.status === 'CoachPending'}
                                    className={`${courseData.status === 'CoachPending' ? ButtonStyles.normalButtonDisable : ButtonStyles.normalButton} self-end`}>
                                        {t("education.aStudentCourses.courseDetails")}  
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    totalPagesCount={StudentCourses?.totalPagesCount} 
                    totalCount={StudentCourses?.totalCount}
                    setPageNumber={setPageNumber}
                    PageNumber={pageNumber}
                    refetch={reftchCourses}
                />

            </div>
        </div>
    );
};

export default AStudentCourses;