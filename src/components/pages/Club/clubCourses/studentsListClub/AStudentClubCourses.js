import React from 'react';
import { useParams } from 'react-router-dom';
import { useAClubStudentCourses } from '../../../../../Utilities/Services/clubQueries';

const AStudentClubCourses = () => {

    const { studentId } = useParams()

    const { data: StudentCourses, isLoading: StudentCoursesLoading, error: StudentCoursesError } = useAClubStudentCourses(studentId && studentId);

    return (
        <div className='pt-20'>
            {studentId} club
        </div>
    );
};

export default AStudentClubCourses;