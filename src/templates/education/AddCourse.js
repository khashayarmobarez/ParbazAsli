import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// assets 
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '../../elements/icons/ListIcon';
import ChartIcon from '../../elements/icons/ChartIcon';
import ChartIcon2 from '../../elements/icons/ChartIcon2';
import ADressTag from '../../elements/icons/ADressTag';
import ColorTagsIcon from '../../elements/icons/ColorTagsIcon';
import CertificateIcon from '../../elements/icons/CertificateIcon';

// mui
import RemoveIcon from '@mui/icons-material/Remove';

// drop down options
import { courseTypeOptionData, courseTypeOptionDataEnglish } from '../../Utilities/Providers/dropdownInputOptions'

// queires
import { useOrganLevelsForCourse, useOrgansData, useUserLevelById } from '../../Utilities/Services/queries';
import { useAddCustomCourse, useAddRegularCourse, useAddRetrainingCourse, useSyllabiForLevels } from '../../Utilities/Services/coursesQueries';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import DropdownInput from '../../elements/inputs/DropDownInput';
import TextInput from '../../elements/inputs/textInput';
import NumberInput from '../../elements/inputs/NumberInput';
import DescriptionInput from '../../elements/inputs/DescriptionInput';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';
import SelectMultiplePopUp from '../../elements/reuseable/SelectMultiplePopUp';
import StandardPopup from '../../elements/reuseable/StandardPopup';
import { useGetActiveClubCoaches } from '../../Utilities/Services/clubQueries';
import Attention from '../../elements/icons/Attention';
import UserIcon from '../../elements/icons/UserIcon';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const AddCourse = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';
    const location = useLocation()

    const isForClub = location.pathname.includes('/club')
    
    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');
    
    // states for regular courses
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')

    // only club
    const [Coach, setCoach] = useState('')

    // states for retraining
    const [courseName, setCourseName] = useState('')
    const [selectedSyllabiFlight, setSelectedSyllabiFlight] = useState([]);
    const [selectedSyllabiGround, setSelectedSyllabiGround] = useState([]);
    const [selectedSyllabiTheory, setSelectedSyllabiTheory] = useState([]);
    const [syllabusIdsFlight, setSyllabusIdsFlight] = useState([]);
    const [syllabusIdsGround, setSyllabusIdsGround] = useState([]);
    const [syllabusIdsTheory, setSyllabusIdsTheory] = useState([]);
    const mergeRetrainingSyllabiIds = [...new Set([...syllabusIdsFlight, ...syllabusIdsTheory, ...syllabusIdsGround])];

    const uniqueSyllabiIds = mergeRetrainingSyllabiIds.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });


    // states for retraining
    const [customCourseTheory, setCustomCourseTheory] = useState('');
    const [customCourseFlight, setCustomCourseFlight] = useState('');
    const [customCourseGround, setCustomCourseGround] = useState('');
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
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabiForLevels(level && level.id);
    const {data: studentData, isLoading:studentNameLoading , error: studentError} = useUserLevelById(studentId && studentId , selectedClassType.id === 3 ? 1 : level && level.id , selectedClassType && selectedClassType.id , setErrorMessage);
    const { data: coachNamesData, isLoading: coachNamesLoading} = useGetActiveClubCoaches();
    const { mutate: addRegularCourse, isLoading: addRegularCourseLoading } = useAddRegularCourse();
    const { mutate: addRetrainingCourse, isLoading: addRetrainingCourseLoading } = useAddRetrainingCourse();
    const { mutate: addCustomCourse, isLoading: addCustomCourseLoading } = useAddCustomCourse();



    // when the studentId goes under 6 characters reset the errorMessage
    useEffect(() => {
        if(studentId.length < 6) {
            setErrorMessage('')
        }
    },[studentId,setErrorMessage])


    useEffect(() => {
        setOrgan('')
        setLevel('')
        setFlightCount('')
        setSelectedSyllabiFlight([])
        setSelectedSyllabiGround([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsFlight([])
        setSyllabusIdsTheory([])
        setCourseName('')
        setDescription('')
        setCustomCourses([])
        setStudentsData([])
        setStudentsList([])
    },[selectedClassType])


    useEffect(() => {
        setLevel('')
        setFlightCount('')
        setSelectedSyllabiFlight([])
        setSelectedSyllabiGround([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsFlight([])
        setSyllabusIdsTheory([])
        setCourseName('')
        setDescription('')
        setCustomCourses([])
        setStudentsData([])
        setStudentsList([])
    },[organ])


    useEffect(() => {
        setFlightCount('')
        setSelectedSyllabiFlight([])
        setSelectedSyllabiGround([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsFlight([])
        setSyllabusIdsTheory([])
        setCourseName('')
        setDescription('')
        setCustomCourses([])
        setStudentsData([])
        setStudentsList([])
    },[level])


    // handle select coach change only for club
    const handleSelectCoachChange = (selectedOption) => {
        setCoach(selectedOption);
    };

    // handle select input states
    const handleSelectClassType = (selectedOption ) => {
        setSelectedClassType(selectedOption);
    }; 

    // handle flight count input state
    const handleFlightCount = (event) => {
        setFlightCount(event.target.value);
    };

    const handleSelectOrganChange = (selectedOption) => {
        setOrgan(selectedOption);
    };

    const handleSelectLevelChange = (selectedOption) => {
        setLevel(selectedOption);
    };

    // handle text input state
    const handleInputStudent = (event) => {
        setStudentId(event.target.value);
    };

    // handle Description input state
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleCourseName = (event) => {
        setCourseName(event.target.value);
    };
    
    const handleAddStudent = () => {
        if (studentId.trim() && studentData?.data) {
            const newStudent = { id: studentId, name: studentData.data.fullName };
            setStudentsList(prev => [...prev, studentId]);
            setStudentsData(prev => [...prev, newStudent]);
            setStudentId('');
        }
    };
    
    const handleRemoveStudent = (studentToRemove) => {
        setStudentsList(prev => prev.filter(student => student !== studentToRemove.id));
        setStudentsData(prev => prev.filter(student => student.id !== studentToRemove.id));
    };
    
    const handleSelectChangeSyllabiFlight = (newSelectedOptions) => {
        setSelectedSyllabiFlight(newSelectedOptions);
        setSyllabusIdsFlight(prev => [...prev, ...newSelectedOptions.map(option => option.id)]);
    };
    
    const handleRemoveSyllabiFlight = (dataToRemove) => {
        setSelectedSyllabiFlight(selectedSyllabiFlight.filter(data => data.id !== dataToRemove.id));
        setSyllabusIdsFlight(prev => prev.filter(id => id !== dataToRemove.id));
    };

    const handleSelectChangeSyllabiGround = (newSelectedOptions) => {
        setSelectedSyllabiGround(newSelectedOptions);
        setSyllabusIdsGround(prev => [...prev, ...newSelectedOptions.map(option => option.id)]);
    };
    
    const handleRemoveSyllabiGround = (dataToRemove) => {
        setSelectedSyllabiGround(selectedSyllabiGround.filter(data => data.id !== dataToRemove.id));
        setSyllabusIdsGround(prev => prev.filter(id => id !== dataToRemove.id));
    };
    
    const handleSelectChangeSyllabiTheory = (newSelectedOptions) => {
        setSelectedSyllabiTheory(newSelectedOptions);
        setSyllabusIdsTheory(newSelectedOptions.map(option => option.id));
    };
    
    const handleRemoveSyllabiTheory = (dataToRemove) => {
        setSelectedSyllabiTheory(selectedSyllabiTheory.filter(data => data.id !== dataToRemove.id));
        setSyllabusIdsTheory(prev => prev.filter(id => id !== dataToRemove.id));
    };
    
    const handleInputTheory = (event) => {
        setCustomCourseTheory(event.target.value);
    };
    
    const handleInputPractical = (event) => {
        setCustomCourseFlight(event.target.value);
    };
    
    const handleInputGroundHandling = (event) => {
        setCustomCourseGround(event.target.value);
    };
    
    const handleAddCustomCourse = (type) => {
        const lastAddedCourse = customCourses[customCourses.length - 1];

        const newTheoryCourse = {
            type,
            description:  customCourseTheory ,
            order: lastAddedCourse ? lastAddedCourse.order + 1 : 1,
        };

        const newPracticalCourse = {
            type,
            description: type === 2 ? customCourseFlight : customCourseGround,
            order: lastAddedCourse ? lastAddedCourse.order + 1 : 1,
            completionTimes: 1
        };

        newTheoryCourse.description && type === 1 && setCustomCourses([...customCourses, newTheoryCourse]);
        newPracticalCourse.description && (type === 2 || type === 3) && setCustomCourses([...customCourses, newPracticalCourse]);

        if (type === 1) {
            setCustomCourseTheory('');
        } else if (type === 2) {
            setCustomCourseFlight('');
        } else {
            setCustomCourseGround('')
        }
        
    };

    const handleDecreaseCustomCourseCompletionTimes = (id) => {
        setCustomCourses(prevCourses =>
            prevCourses.map(course =>
                course.order === id
                    ? {
                          ...course,
                          completionTimes: course.completionTimes > 1
                              ? 
                              course.completionTimes - 1
                              : 
                              setCustomCourses(customCourses.filter(course => course.order !== id))
                      }
                    : course
            )
        );
    };

    const handleIncreaseCustomCourseCompletionTimes = (id) => {
        setCustomCourses(prevCourses =>
            prevCourses.map(course =>
                course.order === id ? { ...course, completionTimes: course.completionTimes + 1 } : course
            )
        );
    }
    
    const handleRemoveCustomCourse = (order) => {
        setCustomCourses(customCourses.filter(course => course.order !== order));
    };

    const handlePopUp= (event) => {

        setIsSubmitted(true)
        event.preventDefault();

        if (selectedClassType.id === 1 && (!selectedClassType || !flightCount || !level) ) {
                toast(t("education.addCourse.completeInfo"), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
        } else if(selectedClassType.id === 2 && (!selectedClassType || !flightCount || !level || !courseName || !(selectedSyllabiFlight.length > 0 || selectedSyllabiTheory.length > 0  || selectedSyllabiGround.length > 0) ) ) {
            toast(t("education.addCourse.completeInfo"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        } else if(selectedClassType.id === 3 && (!selectedClassType || !flightCount || !courseName || customCourses.length < 1) ) {
            toast(t("education.addCourse.completeInfo"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        } else if(isForClub && !Coach) {
            toast(t("education.addCourse.selectCoach"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }


        setShowPopup(true);
    }
    
    
    const handleSubmit = (e) => {
        
        setIsSubmitted(true)
        e.preventDefault();
    
        if ( selectedClassType && flightCount && level) {
    
            const regularformData = isForClub ?
            {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                coachId:Coach.id,
                isForClub
            }
            :
            {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                isForClub
            }

    
            const retrainingformData = isForClub ?
            {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                name: courseName,
                SyllabusIds: uniqueSyllabiIds,
                coachId:Coach.id,
                isForClub
            }
            :
            {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                name: courseName,
                SyllabusIds: uniqueSyllabiIds,
                isForClub
            }

    
            if (selectedClassType.id === 1) {
                addRegularCourse(regularformData, {
                    onSuccess: () => {
                        toast(t("education.addCourse.courseAddedSuccess"), {
                            type: 'success',
                            position: 'top-center',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        navigate(isForClub ? '/club/clubCourses' : '/education');
                    },
                    onError: (error) => {
                        let errorMessage = t("education.addCourse.errorOccurred");
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        setShowPopup(false)
                    }
                });
            } else if ( selectedClassType.id === 2  ) {
                addRetrainingCourse(retrainingformData, {
                    onSuccess: () => {
                        toast(t("education.addCourse.courseAddedSuccess"), {
                            type: 'success',
                            position: 'top-center',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        isForClub ? 
                        navigate('/club/clubCourses')
                        :
                        navigate('/education');
                    },
                    onError: (error) => {
                        let errorMessage = t("education.addCourse.errorOccurred");
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        setShowPopup(false)
                    }
                });
            } 

        } else if (selectedClassType.id === 3 && flightCount) {

            const customCourseData = isForClub ? 
            {
                levelId: 1,
                syllabi: customCourses,
                flightsCount: flightCount,
                description: description,
                name: courseName,
                userIds: studentsList,
                coachId:Coach.id,
                isForClub
            }
            :
            {
                levelId: 1,
                syllabi: customCourses,
                flightsCount: flightCount,
                description: description,
                name: courseName,
                userIds: studentsList,
                isForClub
            }



            addCustomCourse(customCourseData, {
                onSuccess: () => {
                    toast(t("education.addCourse.courseAddedSuccess"), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    isForClub ? 
                        navigate('/club/clubCourses')
                        :
                        navigate('/education');
                },
                onError: (error) => {
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    setShowPopup(false)
                }
            });
        }
    };



    return (
        <div className='flex flex-col items-center mt-6 gap-y-8'>

            <div className='w-full md:w-[55%] flex flex-col items-center gap-y-14'>
            
                <PageTitle title={t("education.addCourse.addCourseTitle")} /> 

                {
                    (isForClub && coachNamesData && coachNamesData.data.length < 1) ?
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center gap-y-4'>
                            <span className='w-16 h-16'>
                                <Attention />
                            </span>
                            <p className='text-textWarning'>{t("education.addCourse.noActiveCoach")}</p>
                        </div>
                        :
                        <>
                        <form className='w-[90%] flex flex-col items-center gap-y-6 lg:mt-8'>

                        {
                            coachNamesData && isForClub &&
                            <DropdownInput
                                id={'ddi1'}
                                options={coachNamesData.data}
                                handleSelectChange={handleSelectCoachChange}
                                selectedOption={Coach}
                                name={t("education.addCourse.selectCoach")}
                                icon={<UserIcon/>}
                            />
                        }

                            <DropdownInput 
                                id={'ddi1'} 
                                isDeselectDeactivated={true}
                                name={t("education.addCourse.courseType")}
                                options={dir === 'ltr' ? courseTypeOptionDataEnglish : courseTypeOptionData}
                                selectedOption={selectedClassType}
                                handleSelectChange={handleSelectClassType}
                                icon={<ColorTagsIcon  />}
                            />

                            {selectedClassType && 
                                <>
                                    {
                                        organsLoading && 
                                        <CircularProgressLoader />
                                    }

                                    {
                                        organsError && 
                                        <div className='w-full min-h-[71vh]'>
                                            <p> 
                                                {t("education.addCourse.organizationFetchError")}
                                            </p>
                                        </div>
                                    }

                                    {/* only دوره های مطابق سیلابس */}
                                    { organsData && (selectedClassType.id === 1 || selectedClassType.id === 2) && 
                                        <>
                                            <DropdownInput
                                            id={'ddi2'}
                                            options={organsData.data}
                                            handleSelectChange={handleSelectOrganChange}
                                            selectedOption={organ}
                                            name={t("education.addCourse.organization")}
                                            icon={<CertificateIcon />}
                                            />
                                            {levelsLoading && organ && <p> {t("education.addCourse.fetchingLevels")}</p>}
                                            {
                                                levelsData && organ && !levelsError &&
                                                <>
                                                    {levelsLoading && <p>Loading levels...</p>}
                                                    {levelsError && <p>Error fetching levels</p>}
                                                    {!levelsError && !levelsLoading &&
                                                        <>
                                                            <DropdownInput
                                                                id={'ddi3'}
                                                                options={levelsData.data}
                                                                handleSelectChange={handleSelectLevelChange}
                                                                selectedOption={level}
                                                                icon={<ChartIcon2/> }
                                                                name={t("education.addCourse.level")}
                                                            />
                                                        </>
                                                    }
                                                </>
                                            }

                                            {/* دوره های بازاموزی */}
                                            {
                                                syllabiData && selectedClassType.id === 2 && 
                                                <>
                                                    {/* <MultipleSelect
                                                        name={'سیلابس ها'}
                                                        options={syllabiData.data}
                                                        selectedOptions={selectedSyllabi}
                                                        handleSelectChange={handleSelectChangeSyllabi}
                                                        handleRemove={handleRemoveSyllabi}
                                                    /> */}

                                                    {/* <SearchMultipleSelect
                                                        Icon={<ListIcon/>}
                                                        options={syllabiData.data.filter(syllabus => syllabus.type === 'Practical') }
                                                        selectedOptions={selectedSyllabiFlight}
                                                        handleSelectChange={handleSelectChangeSyllabiFlight}
                                                        name="سرفصل های عملی"
                                                        handleRemove={handleRemoveSyllabiFlight}
                                                        isForSyllabi={true}
                                                    />

                                                    <SearchMultipleSelect
                                                        Icon={<ListIcon/>}
                                                        options={syllabiData.data.filter(syllabus => syllabus.type === 'Theory') }
                                                        selectedOptions={selectedSyllabiTheory}
                                                        handleSelectChange={handleSelectChangeSyllabiTheory}
                                                        name="سرفصل های تئوری"
                                                        handleRemove={handleRemoveSyllabiTheory}
                                                        isForSyllabi={true}
                                                    /> */}

                                                    {
                                                        syllabiData.data.filter(syllabus => syllabus.type === 'GroundHandling').length > 0 && 
                                                        <SelectMultiplePopUp
                                                            Icon={<ListIcon customColor = {!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0) && isSubmitted && 'var(--text-error)'}/>}
                                                            options={syllabiData.data.filter(syllabus => syllabus.type === 'GroundHandling')}
                                                            isSubmitted={isSubmitted}
                                                            selectedOptions={selectedSyllabiGround}
                                                            handleSelectChange={handleSelectChangeSyllabiGround}
                                                            name={t("education.addCourse.groundHandlingSyllabi")}
                                                            handleRemove={handleRemoveSyllabiGround}
                                                            isForSyllabi={true}
                                                            ErrorCondition={!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0)}
                                                        />
                                                    }
                                                    
                                                    {
                                                        selectedSyllabiFlight.length < 1 && selectedSyllabiTheory.length < 1 && selectedSyllabiGround.length < 1 && isSubmitted &&
                                                        <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOne")}</p>
                                                    } 

                                                    <SelectMultiplePopUp
                                                        Icon={<ListIcon customColor = {!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0) && isSubmitted && 'var(--text-error)'}/>}
                                                        options={syllabiData.data.filter(syllabus => syllabus.type === 'Flight')}
                                                        isSubmitted={isSubmitted}
                                                        selectedOptions={selectedSyllabiFlight}
                                                        handleSelectChange={handleSelectChangeSyllabiFlight}
                                                        name={t("education.addCourse.flightSyllabi")}
                                                        handleRemove={handleRemoveSyllabiFlight}
                                                        isForSyllabi={true}
                                                        ErrorCondition={!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0)}
                                                    />
                                                    {
                                                        selectedSyllabiFlight.length < 1 && selectedSyllabiTheory.length < 1 && selectedSyllabiGround.length < 1 && isSubmitted &&
                                                        <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOne")}</p>
                                                    } 

                                                    <SelectMultiplePopUp
                                                        Icon={<ListIcon customColor = {!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0) && isSubmitted && 'var(--text-error)'}/>}
                                                        options={syllabiData.data.filter(syllabus => syllabus.type === 'Theory') }
                                                        selectedOptions={selectedSyllabiTheory}
                                                        handleSelectChange={handleSelectChangeSyllabiTheory}
                                                        name={t("education.addCourse.theorySyllabi")}
                                                        isSubmitted={isSubmitted}
                                                        handleRemove={handleRemoveSyllabiTheory}
                                                        isForSyllabi={true}
                                                        ErrorCondition={!(selectedSyllabiTheory.length > 0 || selectedSyllabiFlight.length > 0 || selectedSyllabiGround.length > 0)}
                                                    />
                                                    {
                                                        selectedSyllabiFlight.length < 1 && selectedSyllabiTheory.length < 1 && selectedSyllabiGround.length < 1 && isSubmitted &&
                                                        <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOne")}</p>
                                                    }

                                                    <TextInput
                                                        id={'TI1'}
                                                        value={courseName}
                                                        onChange={handleCourseName}
                                                        placeholder={t("education.addCourse.courseName")}
                                                        icon={<ADressTag customColor = {!courseName && isSubmitted && 'var(--text-error)'}/>}
                                                        isSubmitted={isSubmitted}
                                                        ErrorCondition={!courseName}
                                                        ErrorText={t("education.addCourse.courseNameRequired")}
                                                    />
                                                </>

                                            }

                                        </>
                                    }


                                    {selectedClassType.id === 3 && (
                                        <>

                                            <TextInput
                                                id={'TI2'}
                                                value={courseName}  
                                                onChange={handleCourseName}
                                                placeholder={t("education.addCourse.courseName")}
                                                icon={<ADressTag customColor = {!courseName && isSubmitted && 'var(--text-error)'}/>}
                                                isSubmitted={isSubmitted}
                                                ErrorCondition={!courseName}
                                                ErrorText={t("education.addCourse.courseNameRequired")}
                                            />


                                            {/* theory syllabi */}
                                            <div className='w-full flex justify-between relative items-center'>
                                                <div className='w-[70%] flex flex-col'>
                                                <TextInput 
                                                    id={'TI3'}
                                                    icon={<ListIcon customColor = {customCourses.length < 1 && isSubmitted && 'var(--text-error)'}/>}
                                                    value={customCourseTheory} 
                                                    isSubmitted={isSubmitted}
                                                    onChange={handleInputTheory} 
                                                    placeholder={t("education.addCourse.theorySyllabi")}
                                                    className='w-full'
                                                    ErrorCondition={customCourses.length < 1}
                                                />
                                                </div>
                                                <span
                                                    className={` w-[26%] h-[48px] flex justify-center items-center rounded-lg ${ButtonStyles.normalButton}`}
                                                    style={{ borderRadius: '16px', minWidth: '0px' }}
                                                    onClick={() => handleAddCustomCourse(1)}
                                                >
                                                    {t("education.addCourse.add")}
                                                </span>
                                            </div>

                                            {
                                                customCourses.length < 1 && isSubmitted &&
                                                <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOneCustom")}</p>
                                            }

                                            <ul className='w-full py-0 mt-[-1rem] gap-2'>
                                                {customCourses
                                                .filter(course => course.type === 1) // Filter for theoretical courses (type 2)
                                                .map((course,index) => (
                                                    <li key={course.order} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                                    style={{background:  'var(--bg-output-default)',
                                                    boxShadow: 'var(--shadow-all)'}}>
                                                        <p className=' text-sm mx-1' >{index + 1}</p>
                                                        <p className='text-sm px-6 w-full text-start'>{course.description} </p>
                                                        <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                                        boxShadow: 'var(--shadow-all)',
                                                        borderRadius:'0.5rem',
                                                        color:'var(--text-error)'}}
                                                        onClick={() => handleRemoveCustomCourse(course.order)} />
                                                    </li>
                                                ))}
                                            </ul>


                                            {/* flight syllabi */}
                                            <div className='w-full flex justify-between relative items-center gap-y-2'>
                                                <div className='w-[70%]  flex flex-col'>
                                                    <TextInput 
                                                        id={'TI4'}
                                                        icon={<ListIcon customColor = {customCourses.length < 1 && isSubmitted && 'var(--text-error)'}/>}
                                                        value={customCourseFlight}
                                                        isSubmitted={isSubmitted}
                                                        onChange={handleInputPractical}
                                                        placeholder={t("education.addCourse.flightSyllabi")}
                                                        className='w-full'
                                                        ErrorCondition={customCourses.length < 1}
                                                    />
                                                </div>
                                                <span
                                                className={` w-[26%] h-[48px] flex justify-center items-center ${ButtonStyles.normalButton}`}
                                                style={{ borderRadius: '16px', minWidth: '0px' }}
                                                onClick={() => handleAddCustomCourse(2)}
                                                >
                                                    {t("education.addCourse.add")}
                                                </span>
                                            </div>

                                            {
                                                customCourses.length < 1 && isSubmitted &&
                                                <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOneCustom")}</p>
                                            }

                                            <ul className=' w-full py-0 mt-[-1rem] gap-2'>
                                                {customCourses
                                                .filter(course => course.type === 2) // Filter for practical courses (type 2)
                                                .map((course,index) => (
                                                    <li key={course.order} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                                    style={{background:  'var(--bg-output-default)',
                                                    boxShadow: 'var(--shadow-all)'}}>
                                                        <p className=' text-sm mx-1' >{index + 1}</p>
                                                        <p className='text-sm px-6 w-full text-start'>{course.description}</p>
                                                        <div className='h-full flex gap-x-4 items-center'>
                                                            <AddIcon sx={{background:  'var(--bg-input-dropdown)',
                                                            boxShadow: 'var(--shadow-all)',
                                                            borderRadius:'0.5rem',
                                                            color:'var(--text-accent)'}}
                                                            onClick={() => handleIncreaseCustomCourseCompletionTimes(course.order)}/>
                                                            <p>{course.completionTimes}</p>
                                                            <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                                            boxShadow: 'var(--shadow-all)',
                                                            borderRadius:'0.5rem',
                                                            color:'var(--text-error)'}}
                                                            onClick={() => handleDecreaseCustomCourseCompletionTimes(course.order)} />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* ground handling */}
                                            <div className='w-full flex justify-between relative items-center gap-y-2'>
                                                <div className='w-[70%]  flex flex-col'>
                                                    <TextInput 
                                                        id={'TI5'}
                                                        icon={<ListIcon customColor = {customCourses.length < 1 && isSubmitted && 'var(--text-error)'}/>}
                                                        value={customCourseGround}
                                                        isSubmitted={isSubmitted}
                                                        onChange={handleInputGroundHandling}
                                                        placeholder={t("education.addCourse.groundHandlingSyllabi")}
                                                        className='w-full'
                                                        ErrorCondition={customCourses.length < 1}
                                                    />
                                                </div>
                                                <span
                                                className={` w-[26%] h-[48px] flex justify-center items-center ${ButtonStyles.normalButton}`}
                                                style={{ borderRadius: '16px', minWidth: '0px' }}
                                                onClick={() => handleAddCustomCourse(3)}
                                                >
                                                    {t("education.addCourse.add")}
                                                </span>
                                            </div>

                                            {
                                                customCourses.length < 1 && isSubmitted &&
                                                <p className='text-textError -mt-4 self-start text-xs'>{t("education.addCourse.selectAtLeastOneCustom")}</p>
                                            }

                                            <ul className=' w-full py-0 mt-[-1rem] gap-2'>
                                                {customCourses
                                                .filter(course => course.type === 3) // Filter for practical courses (type 2)
                                                .map((course,index) => (
                                                    <li key={course.order} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                                    style={{background:  'var(--bg-output-default)',
                                                    boxShadow: 'var(--shadow-all)'}}>
                                                        <p className=' text-sm mx-1' >{index + 1}</p>
                                                        <p className='text-sm px-6 w-full text-start'>{course.description}</p>
                                                        <div className='h-full flex gap-x-4 items-center'>
                                                            <AddIcon sx={{background:  'var(--bg-input-dropdown)',
                                                            boxShadow: 'var(--shadow-all)',
                                                            borderRadius:'0.5rem',
                                                            color:'var(--text-accent)'}}
                                                            onClick={() => handleIncreaseCustomCourseCompletionTimes(course.order)}/>
                                                            <p>{course.completionTimes}</p>
                                                            <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                                            boxShadow: 'var(--shadow-all)',
                                                            borderRadius:'0.5rem',
                                                            color:'var(--text-error)'}}
                                                            onClick={() => handleDecreaseCustomCourseCompletionTimes(course.order)} />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                    

                                    {
                                        // add or later on add other types of courses
                                        (( !levelsLoading && !levelsError && level) || selectedClassType.id === 3) &&
                                        <>
                                            <NumberInput 
                                            id={'NI1'} 
                                            icon={<ChartIcon customColor = {!flightCount && isSubmitted && 'var(--text-error)'}/>}
                                            name={t("education.addCourse.flightCount")}
                                            value={flightCount}
                                            onChange={handleFlightCount}
                                            placeholder={t("education.addCourse.flightCount")}
                                            isSubmitted={isSubmitted}
                                            ErrorCondition={!flightCount}
                                            ErrorText={t("education.addCourse.flightCountRequired")}
                                            ErrorCondition2={flightCount && flightCount < 0}
                                            ErrorText2={t("education.addCourse.flightCountPositive")}
                                            />

                                            {/* add students */}   
                                            <div className='w-full flex flex-col justify-between relative items-center'>
                                                <div className='w-full flex flex-col'>
                                                    <TextInput
                                                    id={'TI6'}
                                                    value={studentId}
                                                    onChange={handleInputStudent}
                                                    placeholder={t("education.addCourse.studentId")}
                                                    className='w-full'
                                                    />
                                                </div>

                                                { studentNameLoading && studentId.length > 5 &&
                                                    <p className=' self-start mt-1'>{t("education.addCourse.checkingStudent")}</p>
                                                }
                                                { studentError && studentId.length > 5 &&
                                                    <p className='text-[var(--text-error)] self-start text-right mt-1'>{studentError.response.data.ErrorMessages[0].ErrorMessage}</p>
                                                }
                                                {/* <span 
                                                className={`${!studentData && 'blur-[2px]'} w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}
                                                onClick={studentData ? handleAddStudent : null}
                                                >
                                                    <AddIcon sx={{ width: '2.2rem', height: '2.2rem', color:'var(--text-accent)' }} />
                                                </span> */}
                                                {studentData?.data && (
                                                    <ul className="absolute z-20 w-full bg-bgOutputDefault mt-12 rounded-xl shadow-lg max-h-60 overflow-auto" >
                                                    
                                                        <div className='flex flex-col w-full items-center justify-center '>
                                                            <li
                                                                key={studentData.data.id}
                                                                className="px-4 py-2 w-full hover:bg-bgOutputDefault cursor-pointer"
                                                                onClick={() => handleAddStudent()}
                                                            >
                                                                {studentData.data.fullName}
                                                            </li>
                                                        </div>

                                                    </ul>
                                                )}
                                            </div>

                                            <ul className=' w-full py-0 mt-[-1rem] gap-2'>
                                                {studentsData && studentsData?.map((student,index) => (
                                                    <li key={student.id} className=' w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                                    style={{background:  'var(--bg-output-default)',
                                                    boxShadow: 'var(--shadow-all)'}}>
                                                        <div className='flex items-center justify-start gap-x-2'>
                                                            <p className=' text-sm px-1' >{index + 1}</p>
                                                            <p className=' text-sm  w-full text-start' >{student.name}</p>
                                                        </div>
                                                        <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                                        boxShadow: 'var(--shadow-all)',
                                                        borderRadius:'0.5rem',
                                                        color:'var(--text-error)'}}
                                                        onClick={() => handleRemoveStudent(student)} />
                                                    </li>
                                                ))}
                                            </ul>


                                            {/* description input */}
                                            <DescriptionInput
                                                value={description}
                                                onChange={handleDescription}
                                                placeholder={t("education.addCourse.courseDescription")}
                                            />


                                            <button type='submit' onClick={handlePopUp} className={`${ButtonStyles.addButton} w-32 mt-4`}>{t("education.addCourse.submit")} </button>
                                        </>
                                        
                                    }
                                
                                
                                    
                                </>
                            }

                        </form>

                        {/* submit pop up */}
                        <div className={` ${showPopup ? 'fixed' : 'hidden' }  w-full h-full z-[70] backdrop-blur-sm`}>
                            <StandardPopup 
                            explanationtext={t("education.addCourse.confirmationMessage")}
                            showPopup={showPopup} 
                            setShowPopup={setShowPopup} 
                            handleSubmit={handleSubmit}
                            loading={addCustomCourseLoading || addRegularCourseLoading || addRetrainingCourseLoading}
                            submitText={t("education.addCourse.confirm")}
                            declineText={t("education.addCourse.decline")}
                            />
                        </div>
                    </>
                }

            </div>
        </div> 
    );
};

export default AddCourse;