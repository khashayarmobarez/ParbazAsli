import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import GradientStyles from '../../../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'

// assets
import AddIcon from '@mui/icons-material/Add';
import Cube from '../../../../assets/icons/3dCube.svg';
import attention from '../../../../assets/icons/attention.svg';
import listIcon from '../../../../assets/icons/listIcon.svg';
import chartIcon from '../../../../assets/icons/chartIcon.svg';
import singleTag from '../../../../assets/icons/ADressTag.svg';

// mui
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';

// drop down options
import { courseTypeOptionData } from '../../../../Utilities/Providers/dropdownInputOptions'

// queries
import { useAddCustomClubCourse, useAddRegularClubCourse, useAddRetrainingClubCourse, useGetActiveClubCoaches } from '../../../../Utilities/Services/clubQueries';
import { useSyllabiForLevels } from '../../../../Utilities/Services/coursesQueries';
import { useOrganLevelsForCourse, useOrgansData, useUserLevelById } from '../../../../Utilities/Services/queries';

// components
import PageTitle from '../../../reuseable/PageTitle';
import DropdownInput from '../../../inputs/DropDownInput';
import TextInput from '../../../inputs/textInput';
import NumberInput from '../../../inputs/NumberInput';
import DescriptionInput from '../../../inputs/DescriptionInput';
import SearchMultipleSelect from '../../../inputs/SearchMultipleSelect';
import CircularProgressLoader from '../../../Loader/CircularProgressLoader';

const AddClubCourse = () => {

    const navigate = useNavigate()

    
    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');
    const [Coach, setCoach] = useState('')
    
    // states for regular courses
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')
    
    // states for retraining
    const [courseName, setCourseName] = useState('')
    const [selectedSyllabiPractical, setSelectedSyllabiPractical] = useState([]);
    const [selectedSyllabiTheory, setSelectedSyllabiTheory] = useState([]);
    const [syllabusIdsPractical, setSyllabusIdsPractical] = useState([]);
    const [syllabusIdsTheory, setSyllabusIdsTheory] = useState([]);
    const mergeRetrainingSyllabiIds = [...new Set([...syllabusIdsPractical, ...syllabusIdsTheory])];

    const uniqueSyllabiIds = mergeRetrainingSyllabiIds.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    
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
    const { data: coachNamesData, isLoading: coachNamesLoading, error: coachNamesError } = useGetActiveClubCoaches();
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabiForLevels(level && level.id);
    const { data: studentData, isLoading: loadingStudentLevel, error: studentError } = useUserLevelById(studentId && studentId, selectedClassType.id === 3 ? 1 : level && level.id, selectedClassType && selectedClassType.id, setErrorMessage);
    const { mutate: addRegularCourse, isLoading: addRegularCourseLoading } = useAddRegularClubCourse();
    const { mutate: addRetrainingCourse, isLoading: addRetrainingCourseLoading } = useAddRetrainingClubCourse();
    const { mutate: addCustomCourse, isLoading: addCustomCourseLoading } = useAddCustomClubCourse();


    useEffect(() => {
        if(studentError) {
            console.log(studentError.message)
        }
    },[studentError])

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
        setSelectedSyllabiPractical([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsPractical([])
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
        setSelectedSyllabiPractical([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsPractical([])
        setSyllabusIdsTheory([])
        setCourseName('')
        setDescription('')
        setCustomCourses([])
        setStudentsData([])
        setStudentsList([])
    },[organ])


    useEffect(() => {
        setFlightCount('')
        setSelectedSyllabiPractical([])
        setSelectedSyllabiTheory([])
        setSyllabusIdsPractical([])
        setSyllabusIdsTheory([])
        setCourseName('')
        setDescription('')
        setCustomCourses([])
        setStudentsData([])
        setStudentsList([])
    },[level])

    // handle select input states
    const handleSelectClassType = (selectedOption ) => {
        setSelectedClassType(selectedOption);
    }; 

    // handle flight count input state
    const handleFlightCount = (event) => {
        setFlightCount(event.target.value);
    };

    const handleSelectCoachChange = (selectedOption) => {
        setCoach(selectedOption);
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
          setStudentsList((prev) => [...prev, studentId]);
          setStudentsData((prev) => [...prev, newStudent]);
          setStudentId('');
        }
      };
    
    const handleRemoveStudent = (studentToRemove) => {
        setStudentsList(prev => prev.filter(student => student !== studentToRemove.id));
        setStudentsData(prev => prev.filter(student => student.id !== studentToRemove.id));
    };    
    
    const handleSelectChangeSyllabiPractical = (newSelectedOptions) => {
        setSelectedSyllabiPractical(newSelectedOptions);
        setSyllabusIdsPractical(prev => [...prev, ...newSelectedOptions.map(option => option.id)]);
    };
    
    const handleRemoveSyllabiPractical = (dataToRemove) => {
        setSelectedSyllabiPractical(selectedSyllabiPractical.filter(data => data.id !== dataToRemove.id));
        setSyllabusIdsPractical(prev => prev.filter(id => id !== dataToRemove.id));
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
        setCustomCoursePractical(event.target.value);
    };
    
    const handleAddCustomCourse = (type) => {
        const lastAddedCourse = customCourses[customCourses.length - 1];
        const newCourse = {
            type,
            description: type === 1 ? customCourseTheory : customCoursePractical,
            order: lastAddedCourse ? lastAddedCourse.order + 1 : 1,
        };
        newCourse.description && setCustomCourses([...customCourses, newCourse]);
        if (type === 1) {
            setCustomCourseTheory('');
        } else {
            setCustomCoursePractical('');
        }
    };
    
    const handleRemoveCustomCourse = (order) => {
        setCustomCourses(customCourses.filter(course => course.order !== order));
    };

    const handlePopUp= (event) => {
        event.preventDefault();

        if(selectedClassType.id === 1 && (!selectedClassType || !flightCount || !level || !Coach) ) {
                toast('اطلاعات را کامل وارد کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                return;
        } else if(selectedClassType.id === 2 && (!selectedClassType || !flightCount || !level || selectedSyllabiPractical.length < 1 || selectedSyllabiTheory.length < 1 ) ) {
            toast('اطلاعات را کامل وارد کنید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        } else if(selectedClassType.id === 3 && (!selectedClassType || !flightCount || !courseName || customCourses.length < 1 || studentsList.length < 1 ) ) {
            toast('اطلاعات را کامل وارد کنید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        }


        setShowPopup(true);
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if ( selectedClassType && flightCount && level) {
    
            const regularformData = {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                coachId:Coach.id,
            };
    
            const retrainingformData = {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                name: courseName,
                SyllabusIds: uniqueSyllabiIds,
                coachId:Coach.id,
            };
    
            if (selectedClassType.id === 1) {
                addRegularCourse(regularformData, {
                    onSuccess: () => {
                        toast('دوره شما با موفقیت ثبت شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: 'dark',
                            style: { width: "90%" }
                        });
                        navigate('/club/clubCourses');
                    },
                });
            } else if ( selectedClassType.id === 2  ) {
                addRetrainingCourse(retrainingformData, {
                    onSuccess: () => {
                        toast('دوره شما با موفقیت ثبت شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: 'dark',
                            style: { width: "90%" }
                        });
                        navigate('/club/clubCourses');
                    },
                });
            } 

        } else if (selectedClassType.id === 3 && studentsList.length > 0 && flightCount) {

            const customCourseData = {
                levelId: 1,
                syllabi: customCourses,
                flightsCount: flightCount,
                description: description,
                name: courseName,
                userIds: studentsList,
                coachId:Coach.id,
            };

            console.log(customCourseData)

            addCustomCourse(customCourseData, {
                onSuccess: () => {
                    toast('دوره شما با موفقیت ثبت شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    navigate('/club/clubCourses');
                },
                onError: (error) => {
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    console.error(error);
                }
            });
        } 
    };

    return (
        <div className='flex flex-col items-center mt-14 gap-y-8'>
            
            <PageTitle title={'افزودن دوره'} /> 

            <form className='w-[90%] flex flex-col items-center gap-y-6'>

                {
                coachNamesLoading &&
                <CircularProgressLoader />
                }

                {
                    coachNamesData && coachNamesData.data.length < 1 &&
                    <div className='w-full h-[60vh] flex flex-col justify-center items-center'>
                        <img src={attention} alt='attention' className='w-20 h-20 mx-auto' />
                        <p>در حال حاضر مربی فعالی در دوره وجود ندارد</p>
                    </div>
                }

                {
                    coachNamesData && coachNamesData.data.length > 0 &&
                    <DropdownInput
                        options={coachNamesData.data}
                        handleSelectChange={handleSelectCoachChange}
                        selectedOption={Coach}
                        name={'انتخاب مربی'}
                    />
                }

                {
                    coachNamesData && coachNamesData.data.length > 0 &&
                        <DropdownInput name={'نوع دوره'} options={courseTypeOptionData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />
                }

                {selectedClassType && 
                    <>
                        {
                            organsLoading && 
                            <div className='w-full min-h-[71vh]'>
                                <p> 
                                    در حال دریافت اطلاعات سازمان ها...    
                                </p>
                            </div>
                        }

                        {
                            organsError && 
                            <div className='w-full min-h-[71vh]'>
                                <p> 
                                    خطا در دریافت اطلاعات سازمان ها...
                                </p>
                            </div>
                        }

                        {/* only دوره های مطابق سیلابس */}
                        { organsData && (selectedClassType.id === 1 || selectedClassType.id === 2) && 
                            <>
                                <DropdownInput
                                options={organsData.data}
                                handleSelectChange={handleSelectOrganChange}
                                selectedOption={organ}
                                name={'ارگان مربوطه'}
                                />
                                {levelsLoading && organ && <p> در حال دریافت مقاطع ...</p>}
                                {
                                    levelsData && organ && !levelsError &&
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>

                                                <DropdownInput
                                                    options={levelsData.data}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'مقطع'}
                                                />

                                            </>
                                        }
                                    </>
                                }

                                {
                                    syllabiData && selectedClassType.id === 2 && 
                                    <>
                                        {/* <SearchMultipleSelect
                                            options={syllabiData.data}
                                            selectedOptions={selectedSyllabi}
                                            handleSelectChange={handleSelectChangeSyllabi}
                                            name="سیلابس ها"
                                            handleRemove={handleRemoveSyllabi}
                                            isForSyllabi={true}
                                        /> */}

                                        <SearchMultipleSelect
                                            Icon={listIcon}
                                            options={syllabiData.data.filter(syllabus => syllabus.type === 'Practical') }
                                            selectedOptions={selectedSyllabiPractical}
                                            handleSelectChange={handleSelectChangeSyllabiPractical}
                                            name="سرفصل های عملی"
                                            handleRemove={handleRemoveSyllabiPractical}
                                            isForSyllabi={true}
                                        />

                                        <SearchMultipleSelect
                                            Icon={listIcon}
                                            options={syllabiData.data.filter(syllabus => syllabus.type === 'Theory') }
                                            selectedOptions={selectedSyllabiTheory}
                                            handleSelectChange={handleSelectChangeSyllabiTheory}
                                            name="سرفصل های تئوری"
                                            handleRemove={handleRemoveSyllabiTheory}
                                            isForSyllabi={true}
                                        />

                                        <TextInput
                                        value={courseName}
                                        onChange={handleCourseName}
                                        placeholder='نام دوره'
                                        icon={singleTag}
                                        />
                                    </>

                                }

                            </>
                        }


                        {selectedClassType.id === 3 && (
                            <>

                                    <TextInput
                                        value={courseName}
                                        onChange={handleCourseName}
                                        placeholder='نام دوره'
                                        icon={singleTag}
                                    />

                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[86%] flex flex-col'>
                                        <TextInput value={customCourseTheory} onChange={handleInputTheory} placeholder='سرفصل های تئوری' className='w-full' />
                                    </div>
                                    <span
                                        className={` w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}
                                        onClick={() => handleAddCustomCourse(1)}
                                    >
                                        <AddIcon sx={{ width: '2.2rem', height: '2.2rem', color: 'var(--yellow-text)' }} />
                                    </span>
                                </div>

                                <ul className=' w-full py-0 mt-[-1rem] grid grid-cols-1 gap-2'>
                                    {customCourses
                                    .filter(course => course.type === 1) // Filter for theoretical courses (type 2)
                                    .map((course) => (
                                        <li key={course.order} className='col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between items-center'>
                                            <p className='text-sm mx-1'>{course.description} ({course.type === 1 ? 'تئوری' : 'عملی'})</p>
                                            <ClearIcon onClick={() => handleRemoveCustomCourse(course.order)} />
                                        </li>
                                    ))}
                                </ul>

                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[86%] flex flex-col'>
                                        <TextInput value={customCoursePractical} onChange={handleInputPractical} placeholder='سرفصل های عملی' className='w-full' />
                                    </div>
                                    <span
                                        className={` w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}
                                        onClick={() => handleAddCustomCourse(2)}
                                    >
                                        <AddIcon sx={{ width: '2.2rem', height: '2.2rem', color: 'var(--yellow-text)' }} />
                                    </span>
                                </div>

                                <ul className=' w-full py-0 mt-[-1rem] grid grid-cols-1 gap-2'>
                                    {customCourses
                                    .filter(course => course.type === 2) // Filter for practical courses (type 2)
                                    .map((course) => (
                                        <li key={course.order} className='col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between items-center'>
                                            <p className='text-sm mx-1'>{course.description} ({course.type === 1 ? 'تئوری' : 'عملی'})</p>
                                            <ClearIcon onClick={() => handleRemoveCustomCourse(course.order)} />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        

                        {
                            // add or later on add other types of courses
                            (( !levelsLoading && !levelsError && level) || selectedClassType.id === 3) &&
                            <>
                                <NumberInput icon={chartIcon} name={'تعداد پرواز'} value={flightCount} onChange={handleFlightCount} placeholder='تعداد پرواز' />


                                {/* add students */}
                                <div className='w-full flex flex-col gap-y-1'>
                                    { 
                                    studentData && studentData.data &&
                                        <p className=' self-start text-[var(--yellow-text)]'>{studentData.data.fullName}</p>
                                    }
                                    {
                                    loadingStudentLevel && studentId.length > 5 &&
                                        <p className='text-[var(--yellow-text)] self-start'>در حال جستجو ...</p>
                                    }

                                    <div className='w-full flex justify-between relative items-center'>
                                        <div className='w-[86%] flex flex-col'>
                                            <TextInput value={studentId} onChange={handleInputStudent} placeholder='کد کاربری هنرجو' className='w-full' />
                                        </div>
                                        <span 
                                            className={`${!studentData && 'blur-[2px]'} w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}
                                            onClick={studentData ? handleAddStudent : null}
                                        >
                                            <AddIcon sx={{ width: '2.2rem', height: '2.2rem', color: 'var(--yellow-text)' }} />
                                        </span>
                                    </div>
                                    {studentsData.length < 1 &&
                                        <p className='text-start text-sm'>بعد از نوشتن کد کاربری هنرجویانتان داخل کادر،برای اضافه کردن آن ها به نوبت، بر روی دکمه مثبت روبرو کلیک کنید </p>
                                    }
                                </div>

                                <ul className=' w-full py-0 mt-[-1rem] grid grid-cols-3 gap-2'>
                                    {studentsData && studentsData?.map((student) => (
                                        <li key={student.id} className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                                            <p className=' text-sm mx-1' >{student.name}</p>
                                            <ClearIcon onClick={() => handleRemoveStudent(student)} />
                                        </li>
                                    ))}
                                </ul>


                                {/* description input */}
                                <div className='w-full flex flex-col gap-y-2'>
                                    <h1 className=' self-start'>توضیحات درباره دوره</h1>
                                    <DescriptionInput
                                        value={description}
                                        onChange={handleDescription}
                                        placeholder='توضیحات دوره را اینجا بنویسید ...'
                                    />
                                </div>



                                <button type='submit' onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 mt-4`}>ثبت </button>
                            </>
                        }
                        
                        
                    </>
                }

            </form>

            {/* submit pop up */}
            <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>

                <p className='text-base w-[90%]' >در صورت تایید کردن دوره مورد نظر, دوره قابل ویرایش نمی‌باشد دقت کنید </p>

                <div className='w-full flex justify-around items-center'>
                    <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>لغو</button>
                    <button 
                    type="submit" 
                    onClick={handleSubmit} 
                    className={`${ButtonStyles.addButton} w-24`}
                    disabled={addCustomCourseLoading || addRegularCourseLoading || addRetrainingCourseLoading}>
                    {addCustomCourseLoading || addRegularCourseLoading || addRetrainingCourseLoading ? 'در حال ارسال...' : 'تایید'}
                    </button>
                </div>  

            </form>

        </div> 
    );
};

export default AddClubCourse;