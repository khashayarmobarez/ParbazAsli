import React from 'react';
import { useParams } from 'react-router-dom';
import { useAStudentCourses } from '../../../../Utilities/Services/coursesQueries';

const AStudentCourses = () => {

    const { studentId } = useParams()

    const { data: StudentCourses, isLoading: StudentCoursesLoading, error: StudentCoursesError } = useAStudentCourses(studentId && studentId);

    return (
        <div className='pt-20'>
            {studentId} normal
        </div>
    );
};

export default AStudentCourses;