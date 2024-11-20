import React, { useEffect, useState } from 'react';

// hooks
import useConvertMinutesToHours from '../../../../Utilities/Hooks/useConvertToHoursAndMinutes';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';


// queiries
import { useAUserCourseClass } from '../../../../Utilities/Services/StudentCoursesQueries';



const ClassesBoxMyCourses = (props) => {

    const convertToHoursAndMinutes = useConvertMinutesToHours();

    const { classData } = props

    const [isExpanded, setIsExpanded] = useState(false)
    const [extra, setExtra] = useState(false)

    const [formatedDuration, setFormatedDuration] = useState('')


    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useAUserCourseClass(classData.id);

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
                        <div onClick={handleClick} className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm 
                        ${isExpanded && 'text-textAccent'}`}>
                            <span>
                                <AutoStoriesOutlinedIcon sx={{color:isExpanded ? 'var(--text-accent)' : '' , width:'20px', height:'20px'}} />
                            </span>
                            <p>{classData.name}</p>
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
                                <p onClick={() => setExtra(true)} className='text-textAccent font-medium text-base cursor-pointer self-start text-start mr-5 mt-6'>بیشتر ...</p>
                            }

                            {
                                extra &&
                                <>
                                    <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2 mt-6' >
                                        <p>توضیحات کلاس</p>
                                        <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{classDetails.data.description}</p>
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

export default ClassesBoxMyCourses;