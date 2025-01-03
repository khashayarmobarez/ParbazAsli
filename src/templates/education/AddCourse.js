import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import GradientStyles from '../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../styles/Boxes/DataBox.module.css'

// assets 
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '../../components/icons/ListIcon';
import ChartIcon from '../../components/icons/ChartIcon';
import ChartIcon2 from '../../components/icons/ChartIcon2';
import SingleTag from '../../components/icons/ADressTag';
import ColorTagsIcon from '../../components/icons/ColorTagsIcon';
import CertificateIcon from '../../components/icons/CertificateIcon';

// mui
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

// drop down options
import { courseTypeOptionData } from '../../Utilities/Providers/dropdownInputOptions'

// queires
import { useOrganLevelsForCourse, useOrgansData, useUserLevelById } from '../../Utilities/Services/queries';
import { useAddCustomCourse, useAddRegularCourse, useAddRetrainingCourse, useSyllabiForLevels } from '../../Utilities/Services/coursesQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import DropdownInput from '../../components/inputs/DropDownInput';
import TextInput from '../../components/inputs/textInput';
import NumberInput from '../../components/inputs/NumberInput';
import DescriptionInput from '../../components/inputs/DescriptionInput';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import SelectMultiplePopUp from '../../components/reuseable/SelectMultiplePopUp';
import StandardPopup from '../../components/reuseable/StandardPopup';

const AddCourse = () => {

    const navigate = useNavigate()

    const appTheme = Cookies.get('themeApplied') || 'dark';
    
    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');
    
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
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabiForLevels(level && level.id);
    const {data: studentData, isLoading:studentNameLoading , error: studentError} = useUserLevelById(studentId && studentId , selectedClassType.id === 3 ? 1 : level && level.id , selectedClassType && selectedClassType.id , setErrorMessage);
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

        setIsSubmitted(true)
        event.preventDefault();

        if(selectedClassType.id === 1 && (!selectedClassType || !flightCount || !level) ) {
                toast('اطلاعات را کامل وارد کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
        } else if(selectedClassType.id === 2 && (!selectedClassType || !flightCount || !level || !courseName || selectedSyllabiPractical.length < 1 || selectedSyllabiTheory.length < 1 ) ) {
            toast('اطلاعات را کامل وارد کنید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        } else if(selectedClassType.id === 3 && (!selectedClassType || !flightCount || !courseName || customCourses.length < 1) ) {
            toast('اطلاعات را کامل وارد کنید', {
                type: 'error',
                position: 'top-right',
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
    
            const regularformData = {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
            };
    
            const retrainingformData = {
                levelId: level.id,
                flightsCount: flightCount,
                description: description,
                userIds: studentsList,
                name: courseName,
                SyllabusIds: uniqueSyllabiIds,
            };
    
            if (selectedClassType.id === 1) {
                addRegularCourse(regularformData, {
                    onSuccess: () => {
                        toast('دوره شما با موفقیت ثبت شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        navigate('/education');
                    },
                    onError: (error) => {
                        let errorMessage = 'خطایی رخ داده است';
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
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
                        toast('دوره شما با موفقیت ثبت شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        navigate('/education');
                    },
                    onError: (error) => {
                        let errorMessage = 'خطایی رخ داده است';
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        setShowPopup(false)
                    }
                });
            } 

        } else if (selectedClassType.id === 3 && flightCount) {

            const customCourseData = {
                levelId: 1,
                syllabi: customCourses,
                flightsCount: flightCount,
                description: description,
                name: courseName,
                userIds: studentsList,
            };

            console.log(customCourseData)

            addCustomCourse(customCourseData, {
                onSuccess: () => {
                    toast('دوره شما با موفقیت ثبت شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    navigate('/education');
                },
                onError: (error) => {
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
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
            
                <PageTitle title={'افزودن دوره'} /> 

                <form className='w-[90%] flex flex-col items-center gap-y-6 lg:mt-8'>

                    <DropdownInput 
                    id={'ddi1'} 
                    isDeselectDeactivated={true} 
                    name={'نوع دوره'}
                    options={courseTypeOptionData}
                    selectedOption={selectedClassType}
                    handleSelectChange={handleSelectClassType}
                    icon={<ColorTagsIcon/>}
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
                                        خطا در دریافت اطلاعات سازمان ها...
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
                                    name={'ارگان'}
                                    icon={<CertificateIcon/>}
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
                                                        id={'ddi3'}
                                                        options={levelsData.data}
                                                        handleSelectChange={handleSelectLevelChange}
                                                        selectedOption={level}
                                                        icon={<ChartIcon2/>}
                                                        name={'مقطع'}
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
                                                selectedOptions={selectedSyllabiPractical}
                                                handleSelectChange={handleSelectChangeSyllabiPractical}
                                                name="سرفصل های عملی"
                                                handleRemove={handleRemoveSyllabiPractical}
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

                                            <SelectMultiplePopUp
                                                Icon={<ListIcon/>}
                                                options={syllabiData.data.filter(syllabus => syllabus.type === 'Practical') }
                                                selectedOptions={selectedSyllabiPractical}
                                                handleSelectChange={handleSelectChangeSyllabiPractical}
                                                name="سرفصل های عملی"
                                                handleRemove={handleRemoveSyllabiPractical}
                                                isForSyllabi={true}
                                            />
                                            {
                                                selectedSyllabiPractical.length < 1 && selectedSyllabiTheory.length < 1 && isSubmitted &&
                                                <p className='text-textError -mt-4 self-start text-xs'>حداقل یک مورد را از بین سرفصل های تئوری و عملی انتخاب کنید</p>
                                            } 

                                            <SelectMultiplePopUp
                                                Icon={<ListIcon/>}
                                                options={syllabiData.data.filter(syllabus => syllabus.type === 'Theory') }
                                                selectedOptions={selectedSyllabiTheory}
                                                handleSelectChange={handleSelectChangeSyllabiTheory}
                                                name="سرفصل های تئوری"
                                                handleRemove={handleRemoveSyllabiTheory}
                                                isForSyllabi={true}
                                            />
                                            {
                                                selectedSyllabiPractical.length < 1 && selectedSyllabiTheory.length < 1 && isSubmitted &&
                                                <p className='text-textError -mt-4 self-start text-xs'>حداقل یک مورد را از بین سرفصل های تئوری و عملی انتخاب کنید</p>
                                            }

                                            <TextInput
                                                id={'TI1'}
                                                value={courseName}
                                                onChange={handleCourseName}
                                                placeholder='نام دوره'
                                                icon={<SingleTag/>}
                                                isSubmitted={isSubmitted}
                                                ErrorCondition={!courseName}
                                                ErrorText={'نام دوره الزامی است'}
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
                                        placeholder='نام دوره'
                                        icon={<SingleTag/>}
                                        isSubmitted={isSubmitted}
                                        ErrorCondition={!courseName}
                                        ErrorText={'نام دوره الزامی است'}
                                    />

                                    <div className='w-full flex justify-between relative items-center'>
                                        <div className='w-[70%] flex flex-col'>
                                            <TextInput id={'TI3'} icon={<ListIcon/>} value={customCourseTheory} onChange={handleInputTheory} placeholder='سرفصل های تئوری' className='w-full' />
                                        </div>
                                        <span
                                            className={` w-[26%] h-[48px] flex justify-center items-center rounded-lg ${ButtonStyles.normalButton}`}
                                            style={{ borderRadius: '16px', minWidth: '0px' }}
                                            onClick={() => handleAddCustomCourse(1)}
                                        >
                                            افزودن
                                        </span>
                                    </div>

                                    {
                                        customCourses.length < 1 && isSubmitted &&
                                        <p className='text-textError -mt-4 self-start text-xs'>حداقل یک مورد را از بین سرفصل های تئوری و عملی وارد کنید</p>
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

                                    <div className='w-full flex justify-between relative items-center gap-y-2'>
                                        <div className='w-[70%]  flex flex-col'>
                                            <TextInput id={'TI4'} icon={<ListIcon/>} value={customCoursePractical} onChange={handleInputPractical} placeholder='سرفصل های عملی' className='w-full' />
                                        </div>
                                        <span
                                            className={` w-[26%]  h-[48px] flex justify-center items-center ${ButtonStyles.normalButton}`}
                                            style={{ borderRadius: '16px', minWidth: '0px' }}
                                            onClick={() => handleAddCustomCourse(2)}
                                        >
                                            افزودن
                                        </span>
                                    </div>

                                    {
                                        customCourses.length < 1 && isSubmitted &&
                                        <p className='text-textError -mt-4 self-start text-xs'>حداقل یک مورد را از بین سرفصل های تئوری و عملی وارد کنید</p>
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
                                                <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                                boxShadow: 'var(--shadow-all)',
                                                borderRadius:'0.5rem',
                                                color:'var(--text-error)'}}
                                                onClick={() => handleRemoveCustomCourse(course.order)} />
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
                                    icon={<ChartIcon/>} 
                                    name={'تعداد پرواز'} 
                                    value={flightCount} 
                                    onChange={handleFlightCount} 
                                    placeholder='تعداد پرواز' 
                                    isSubmitted={isSubmitted}
                                    ErrorCondition={!flightCount}
                                    ErrorText={'تعداد پرواز الزامی است'}
                                    ErrorCondition2={flightCount && flightCount < 0}
                                    ErrorText2={'تعداد پرواز باید بزرگتر از 0 باشد'}
                                    />

                                    {/* add students */}   
                                    <div className='w-full flex flex-col justify-between relative items-center'>
                                        <div className='w-full flex flex-col'>
                                            <TextInput id={'TI5'} value={studentId} onChange={handleInputStudent} placeholder='کد کاربری هنرجو' className='w-full' />
                                        </div>

                                        { studentNameLoading && studentId.length > 5 &&
                                        <p className=' self-start mt-1'>در حال بررسی هنرجو ... </p>
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
                                        placeholder='توضیحات دوره را اینجا بنویسید ...'
                                    />


                                    <button type='submit' onClick={handlePopUp} className={`${ButtonStyles.addButton} w-32 mt-4`}>ثبت </button>
                                </>
                                
                            }
                        
                        
                            
                        </>
                    }

                </form>

                {/* submit pop up */}
                <div className={` ${showPopup ? 'fixed' : 'hidden' }  w-full h-full z-[70] backdrop-blur-sm`}>
                    <StandardPopup 
                    explanationtext={'در صورت تایید کردن دوره مورد نظر, دوره قابل ویرایش نمی‌باشد دقت کنید '}
                    showPopup={showPopup} 
                    setShowPopup={setShowPopup} 
                    handleSubmit={handleSubmit}
                    loading={addCustomCourseLoading || addRegularCourseLoading || addRetrainingCourseLoading}
                    submitText='بله' 
                    declineText='خیر'
                    />
                </div>
            </div>

        </div> 
    );
};

export default AddCourse;