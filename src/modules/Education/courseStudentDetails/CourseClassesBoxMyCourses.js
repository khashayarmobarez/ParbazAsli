import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// hooks
import useConvertMinutesToHours from '../../../Utilities/Hooks/useConvertToHoursAndMinutes';

// styles
import gradients from '../../../styles/Gradient.module.css'
import boxStyles from '../../../styles/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// queiries
import { useCourseStudentClass } from '../../../Utilities/Services/coursesQueries';
import { useTranslation } from '../../../Utilities/context/TranslationContext';


const CourseClassesBoxMyCourses = (props) => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const convertToHoursAndMinutes = useConvertMinutesToHours();

    const { classData } = props

    const [isExpanded, setIsExpanded] = useState(false)
    const [extra, setExtra] = useState(false)

    const [formatedDuration, setFormatedDuration] = useState('')


    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useCourseStudentClass(classData.id);

    useEffect(() => {
        if (classDetails) {
            const formatted = convertToHoursAndMinutes(classDetails.data.classDurationInMinutes);
            setFormatedDuration(formatted);
            console.log(formatedDuration)
        }
    }, [classDetails, convertToHoursAndMinutes, formatedDuration])

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='flex flex-col space-y-4 w-full'>

                {
                    classData &&
                    <>
                        {/* classesInput */}
                        <div onClick={handleClick} className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-xs
                        ${isExpanded && 'text-[var(--text-accent)]'}`}>
                            <div className='flex gap-x-2 items-center'>
                                <span>
                                    <AutoStoriesOutlinedIcon sx={{color:isExpanded ? 'var(--text-accent)' : ''}} />
                                </span>
                                <p>{classData.name}</p>
                            </div>
                            <p>{classData.classDuration}</p>
                            <div/>
                        </div>

                        {isExpanded && classDetails &&
                            <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col items-center pt-10 pb-8`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full  px-4'>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>نام</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.name}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>مدت زمان</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.classDuration}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان شروع</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.startTime}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان پایان</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.endTime}</p>
                                    </div>
                                </div>  
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>تاریخ</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.dateTime}</p>
                                    </div>
                                </div>  
            
                            </div>

                            {
                                !extra &&
                                <p onClick={() => setExtra(true)} className='text-[var(--text-accent)] font-medium text-base cursor-pointer self-start text-start mx-5 mt-6'>بیشتر ...</p>
                            }

                            {
                                extra &&
                                <>
                                    <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2 mt-6' >
                                        <p>توضیحات کلاس</p>
                                        <p className={`${boxStyles.classDetailsData} p-4 text-sm min-h-14 w-full text-right`}>{classDetails.data.description}</p>
                                    </div>
                    
                                    {classDetails.data.syllabi &&
                                        <div className='w-[90%] flex flex-col items-start gap-y-2 mx-4 mt-7'>
                                                <p className=' text-sm'>مباحث مطرح شده</p>
                                                { 
                                                    classDetails.data.syllabi.map((syllabus, index) => (
                                                        <div key={index} className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 py-2 w-full min-h-12 rounded-xl`} id='data'>
                                                            <p>{syllabus.description}</p>
                                                        </div>
                                                    ))
                                                }
                                        </div>
                                    }
                                </>
                            }
            
            
                        </form>
                        }
                    </>
                }

                
                


        </div>
    );
};

export default CourseClassesBoxMyCourses;