import React, { useEffect, useState } from 'react';

// hooks
import useConvertMinutesToHours from '../../Utilities/Hooks/useConvertToHoursAndMinutes';

// styles
import gradients from '../../styles/gradients/Gradient.module.css'
import boxStyles from '../../styles/Boxes/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';


// queiries
import { useAClass } from '../../Utilities/Services/coursesQueries';

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../Utilities/ReduxToolKit/features/userData/userSlice';


const ClassesBoxCourses = (props) => {

    const convertToHoursAndMinutes = useConvertMinutesToHours();

    // imported directly here from redux to prevent props drilling
    const {userRole} = useSelector(selectUser)
    const { classData } = props

    const [isExpanded, setIsExpanded] = useState(false)
    const [extraData, setExtraData] = useState(false)

    const [formatedDuration, setFormatedDuration] = useState('')

    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useAClass(classData.id);

    useEffect(() => {
        if (classDetails) {
            const formatted = convertToHoursAndMinutes(classDetails.data.classDurationInMinutes);
            setFormatedDuration(formatted);
        }
    }, [classDetails, convertToHoursAndMinutes, formatedDuration])

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    const handleClickExtraData = () =>{
        setExtraData(!extraData);
    }

    return (
        <div className='flex flex-col space-y-4 w-full'>

                {
                    classData &&
                    <>
                        {/* classesInput */}
                        <div onClick={handleClick} className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm 
                        ${isExpanded && 'text-textAccent'}`}>
                            <div className='flex gap-x-2'>
                                <span>
                                    <AutoStoriesOutlinedIcon sx={{color:isExpanded ? 'var(--text-accent)' : '', width:'20px', height:'20px'}} />
                                </span>
                                <p>{classData.name}</p>
                            </div>
                            <p>{classData.classDuration}</p>
                            <div className='w-1 h-1'/>
                        </div>

                        {isExpanded && classDetails &&
                            <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col pt-10 pb-8 items-center`}>

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
                                !extraData &&
                                <div className='w-full flex justify-center px-4 mt-12'>
                                    <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs' style={{color:'var(--text-accent'}} >اطلاعات بیشتر...</button>
                                </div>
                            }
            
                            { extraData &&
                                <div id='no grid list' className='w-full items-center flex flex-col gap-y-5 mt-6'>

                                    <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2 mt-6' >
                                        <p>توضیحات کلاس</p>
                                        <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{classDetails.data.description}</p>
                                    </div>
                    
                    
                                    <div className=' w-[90%] flex flex-col items-start gap-y-2 mx-4 mt-7'>
                                            <p className=' text-sm'>مباحث مطرح شده</p>
                                            {   classDetails &&
                                                classDetails.data.syllabi.map((syllabus) => (
                                                    <div key={syllabus.id} className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                        <p>{syllabus.description}</p>
                                                    </div>
                                                ))

                                            }
                                    </div>
                
                                    {
                                        classDetails.data.userCourses.length > 0 &&
                                            <div className=' flex flex-col items-start gap-y-2 mx-4 w-[90%]'>
                                                    <p className=' text-sm'>هنرجویان</p>
                                                    <div className='w-full flex flex-col gap-y-5'>
                                                    {
                                                    classDetails.data.userCourses.map((student, index) => (    
                                                        <div key={index} className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{student.name}</p>
                                                        </div>
                                                    ))
                                                    }
                                                    </div>
                                            </div>
                                    }

                
                                    {classDetails.data.guestUsers && classDetails.data.guestUsers.length > 0 &&
                                        <div className=' flex flex-col items-start gap-y-2 mx-4 w-[90%]'>
                                                <p className=' text-sm'>هنرجویان مهمان</p>
                                                <div className='w-full flex flex-col gap-y-5'>   
                                                {
                                                classDetails.data.guestUsers.map((student,index) => ( 
                                                    <div key={index} className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{student.name}</p>
                                                    </div>))
                                                }
                                                </div>
                                        </div>
                                    }
            
                                </div>}

                            {
                                userRole === 'coach' && extraData &&
                                <div className='w-full flex justify-center px-4 mt-12'>
                                    <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs' style={{color:'var(--text-accent'}} >بستن اطلاعات بیشتر</button>
                                </div>
                            }
            
            
                        </form>
                        }
                    </>
                }

        </div>
    );
};

export default ClassesBoxCourses;