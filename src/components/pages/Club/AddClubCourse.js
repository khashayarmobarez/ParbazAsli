import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// queries
import { useAddRegularClubCourse, useAddRetrainingClubCourse } from '../../../Utilities/Services/clubQueries';
import { useAddCustomCourse, useSyllabiForLevels } from '../../../Utilities/Services/coursesQueries';
import { useOrganLevelsForCourse, useOrgansData, useUserLevelById } from '../../../Utilities/Services/queries';

const AddClubCourse = () => {

    const navigate = useNavigate()

    
    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');
    
    // states for regular courses
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')

    // states for retraining
    const [selectedSyllabi, setSelectedSyllabi] = useState([]);
    const [syllabusIds, setSyllabusIds] = useState([]);
    const [courseName, setCourseName] = useState('')
    
    // states for retraining
    const [customCourseTheory, setCustomCourseTheory] = useState('');
    const [customCoursePractical, setCustomCoursePractical] = useState('');
    const [customCourses, setCustomCourses] = useState([]);

    // added students 
    const [studentsList, setStudentsList] = useState([]); 
    const [studentsData, setStudentsData] = useState([]);
    
    // text states
    const [studentId, setStudentId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [description, setDescription] = useState('');

    // popUp
    const [showPopup, setShowPopup] = useState(false)
    
    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ.id);
    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabiForLevels(level.id);
    const {data: studentData} = useUserLevelById(studentId , selectedClassType.id === 3 ? 1 : level.id , selectedClassType.id , setErrorMessage);
    const { mutate: addRegularCourse, isLoading: addRegularCourseLoading } = useAddRegularClubCourse();
    const { mutate: addRetrainingCourse, isLoading: addRetrainingCourseLoading } = useAddRetrainingClubCourse();
    const { mutate: addCustomCourse, isLoading: addCustomCourseLoading } = useAddCustomCourse();

    return (
        <div>
            
        </div>
    );
};

export default AddClubCourse;