import React, { useEffect, useState } from 'react';

// hooks
import useConvertMinutesToHours from '../../../../Utilities/Hooks/useConvertToHoursAndMinutes';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// assets
import clipboard from '../../../../assets/icons/clipboard.svg'

// queiries
import { useAUserCourseClass } from '../../../../Utilities/Services/StudentCoursesQueries';



const ClassesBoxMyCourses = (props) => {

    const convertToHoursAndMinutes = useConvertMinutesToHours();

    const { classData } = props

    const [isExpanded, setIsExpanded] = useState(false)

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
                        <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                            <span>
                                <AutoStoriesOutlinedIcon />
                            </span>
                            <p>{classData.name}</p>
                            <p>{formatedDuration}</p>
                            <button onClick={handleClick} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                                <img src={clipboard} alt='icon' />
                            </button>
                        </div>

                        {isExpanded && classDetails &&
                            <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col pt-10 pb-8`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full  px-4'>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>نام دوره</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.name}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>طول دوره</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.classDurationInMinutes} دقیقه</p>
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
            
                            {classDetails.data.syllabi &&
                                <div className='flex flex-col items-start gap-y-2 mx-4 mt-7'>
                                        <p className=' text-sm'>مباحث مطرح شده</p>
                                        { 
                                            classDetails.data.syllabi.map((syllabus) => (
                                                <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                    <p>{syllabus.description}</p>
                                                </div>
                                            ))

                                        }
                                </div>
                            }
            
            
                        </form>
                        }
                    </>
                }

                
                


        </div>
    );
};

export default ClassesBoxMyCourses;