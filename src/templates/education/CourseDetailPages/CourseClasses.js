import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// mui
import AddIcon from '@mui/icons-material/Add';

// styles
import dataBox from '../../../styles/DataBox.module.css'
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// queries
import { useACourse, useACourseClasses } from '../../../Utilities/Services/coursesQueries';

// components
import ClassesBoxCourses from '../../../modules/Education/ClassesBoxCourses';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const CourseClasses = () => {

    // language
    const { t } = useTranslation();

    const { id } = useParams();
    const navigate = useNavigate();

    const {  data: classesData } = useACourseClasses(id);
    const { data: aCourseData } = useACourse(id);
    

    return (
        <div className='w-full flex flex-col gap-y-8 items-center pb-28 '>

            {classesData && classesData.data.classesCount < 1 &&
                <p className='w-full text-center text-textWarning'>{t("education.aCourseDetails.classes.noClassesAdded")}</p>
            }
            
            {classesData && classesData.data.classesCount > 0 &&
            <>
                <div className=' w-full grid grid-cols-4 items-center text-border-button-yellow gap-x-6'>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>{t("education.aCourseDetails.classes.numberOfClasses")}</p>
                        <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.classesCount}
                        </p>
                    </div>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>{t("education.aCourseDetails.classes.totalClassHours")}</p>
                        <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.totalClassHours}
                        </p>
                    </div>

                </div>
            
                <div className='w-full flex flex-col items-center gap-y-4'>
                {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBoxCourses title={t("education.aCourseDetails.classes.classes")} key={classData.id} classData={classData} />;
                    })
                }
                </div>
            </>
            }

            
            {
                aCourseData?.data.accesses.canAddClass &&
                <div className=' top-[2.85rem] w-full md:w-2/6 z-10'>
                    <div className="relative z-10">
                        <button 
                        onClick={() => navigate(`/education/${id}/AddClass`)} 
                        className={`${ButtonStyles.addButton} w-full`}
                        >
                            <AddIcon />
                            <p>{t("education.aCourseDetails.classes.addClass")}</p>
                        </button>
                    </div>
                    <div className="bg-bgPageMain opacity-90 h-10 w-full -mt-4 relative z-0" />
                </div>
            }

        </div>
    );
};

export default CourseClasses;