import React, { useEffect, useState } from 'react';
import PageTitle from '../../../reuseable/PageTitle';
import { useAllStudentDividers, useCourseCounts } from '../../../../Utilities/Services/coursesQueries';
import { useParams } from 'react-router-dom';
import CircularProgressLoader from '../../../Loader/CircularProgressLoader';
import DropDownLine from '../../../reuseable/DropDownLine';
import ACourseStudents from './ACourseStudents';

const StudentsList = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()

    // controlling  items drop down
    const [DropDown, setDropDown] = useState([]);

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts();
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudentDividers, isLoading: AllStudentDividersLoading, error: AllStudentDividerError } = useAllStudentDividers(id && id);

    // function to active all the drop downs when all student dividers came
    useEffect(() => {
        if (AllStudentDividers) {
            setDropDown((prevState) =>
                AllStudentDividers.data.map((course, index) => `dropDown${index}`)
            );
        }
    }, [AllStudentDividers]);


    const handleOpenDropDowns = (dropDown) => {
        
        !DropDown.includes(dropDown) && setDropDown([...DropDown,dropDown])
        DropDown.includes(dropDown) && setDropDown(DropDown.filter(item => item !== dropDown))

    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            { (courseCountsLoading || AllStudentDividersLoading) &&
                <CircularProgressLoader /> 
            }

            {AllStudentDividerError &&
                <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
            }

            {
                courseCountsData && AllStudentDividers &&
                <div className='w-full flex flex-col items-center gap-y-4'>
                    <PageTitle 
                        title={`${id === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`} 
                        navigateTo={'/education'} 
                    />

                {
                    AllStudentDividers && AllStudentDividers.data.length < 1 && !AllStudentDividersLoading && !AllStudentDividerError &&
                    <p className='h-60vh w-full text-center flex justify-center items-center mt-8'> هنرجویی یافت نشد</p>
                }


                    {AllStudentDividers.data.length > 0 &&
                        AllStudentDividers.data.map((course, index) => (
                            <div key={index} className='w-[90%] flex flex-col items-center'>
                                <DropDownLine  
                                    onClickActivation={() => handleOpenDropDowns(`dropDown${index}`)}
                                    title={`${course.name} (${course.studentCount})`}
                                    dropDown={DropDown}
                                    isActive={DropDown.includes(`dropDown${index}`)}  
                                />

                                {   AllStudentDividers.data &&
                                    DropDown.includes(`dropDown${index}`) && 
                                        <ACourseStudents courseData={course} isForHistory={id === '1' ? false : true} />
                                }
                            </div>
                        ))
                    }
                    
                </div>
            }
            
        </div>
    );
};

export default StudentsList;