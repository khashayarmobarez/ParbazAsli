import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../styles/DataBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useUserCourseClasses } from '../../Utilities/Services/StudentCoursesQueries';

// components
import ClassesBoxMyCourses from '../../modules/MyCourses/ClassesBoxMyCourses';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const TheoryMyCourse = () => {

    const { t } = useTranslation();

    const { id } = useParams();

    const {  data: classesData, isLoading: classesDataLoading } = useUserCourseClasses(id);


    return (
        <div className='w-full flex flex-col gap-y-4 items-center pb-20'>

            {
                classesDataLoading &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }

            {classesData && classesData.data.classesCount === 0 && 
                <p className='text-textWarning'>{t("myCourses.aCourseDetails.Theory.noTheoryClasses")}</p>
            }

            {classesData && classesData.data.classesCount > 0 &&
            <>

                    <div className='flex w-full justify-between gap-x-2 mb-2'>
                        
                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>{t("myCourses.aCourseDetails.Theory.classesCount")}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.classesCount}</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>{t("myCourses.aCourseDetails.Theory.totalClassHours")}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.totalClassHours}</p>
                                </div>
                            </div>

                    </div>

                {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBoxMyCourses title={t("myCourses.aCourseDetails.Theory.classesTitle")} key={classData.id} classData={classData} />;
                    })
                }

                {/* group name of data */}
                {/* <div className='flex justify-between items-center w-full gap-x-2 mt-4'>
                    <h2 className='text-nowrap'>کلاس های مهمان </h2>
                    <div id='line' className='w-full h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div> */}
            </>
            }
            
        </div>
    );
};

export default TheoryMyCourse;